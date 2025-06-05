"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Copy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const cartContext = useCart();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    acceptTerms: false,
  });
  const [step, setStep] = useState(1);
  const [showPixPopup, setShowPixPopup] = useState(false);
  const [pixData, setPixData] = useState({
    qrCode: "",
    copyPasteCode: "",
    transactionId: "",
    amount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartItems = cartContext?.items || items;
  const cartTotalPrice = cartContext?.totalPrice || totalPrice;
  const cartRemoveItem = cartContext?.removeItem || removeItem;
  const cartUpdateQuantity = cartContext?.updateQuantity || updateQuantity;
  const cartClearCart = cartContext?.clearCart || clearCart;

  useEffect(() => {
    setIsClient(true);
    if (!cartContext) {
      const savedCart = localStorage.getItem("shoyo-cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
          const total = parsedCart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          setTotalPrice(total);
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
    }
  }, [cartContext]);

  useEffect(() => {
    if (!cartContext) {
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
      localStorage.setItem("shoyo-cart", JSON.stringify(items));
    }
  }, [items, cartContext]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const createPixTransaction = async () => {
  setIsLoading(true);
  setError("");

  try {
    if (!customerInfo.name.trim()) {
      throw new Error("O nome completo é obrigatório");
    }

    if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      throw new Error("Digite um email válido");
    }

    const phoneDigits = customerInfo.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      throw new Error("Digite um telefone válido com DDD");
    }

    if (!customerInfo.acceptTerms) {
      throw new Error("Você deve aceitar os termos e condições");
    }

    const response = await fetch("/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        amount: cartTotalPrice,
      }),
    });

    const data = await response.json();
    console.log("Resposta da API Pix:", data);

   if (!response.ok) {
   throw new Error(data.error || data.message || "Erro ao gerar Pix");
   }


    // Guardando apenas o código pix copia e cola, sem QR Code
   setPixData({
    copyPasteCode: data.qrcode || "", // ← recebendo o texto Pix Copia e Cola
    transactionId: data.id,
    amount: data.amount,
    });


    setShowPixPopup(true);
    setPaymentStatus("pending");
  } catch (err: any) {
    setError(err.message || "Ocorreu um erro ao processar o pagamento");
  } finally {
    setIsLoading(false);
  }
};


  const handleCheckout = () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }
    createPixTransaction();
  };

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  SHOYO <span className="text-red-600">SHOYO</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/shoyoshoyo.delivery?igsh=OWI1ZGM3YnoyNjBt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 container px-4 md:px-6 py-12">
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            <Image
              src="/molho-shoyu.png"
              alt="Molho Shoyu"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <h1 className="text-3xl font-bold">Seu carrinho está vazio</h1>
            <Button asChild className="bg-red-600 text-white hover:bg-red-700">
              <Link href="/categoria/mais-pedidos">Ver Cardápio</Link>
            </Button>
          </div>
        </main>
        <footer className="w-full border-t border-white/10 bg-black py-6 md:py-0">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:h-16">
            <p className="text-sm text-gray-400">
              © 2024 Shoyo Shoyo. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                SHOYO <span className="text-red-600">SHOYO</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/shoyoshoyo.delivery?igsh=OWI1ZGM3YnoyNjBt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Button asChild className="bg-white text-black border-black mb-3">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Seu Carrinho</h1>
          </div>

          {step === 1 ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4 md:space-y-6">
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="p-3 md:p-4 bg-white/5 text-center">
                    <h2 className="text-lg md:text-xl font-bold">
                      Itens Selecionados
                    </h2>
                  </div>
                  <div className="divide-y divide-white/10">
                    {cartItems.map((item: any) => (
                      <div
                        key={`${item.category}-${item.id}`}
                        className="p-3 md:p-4 flex gap-3 md:gap-4"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0">
                          <Image
                            src={item.image || "/logo.png"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h3 className="font-bold text-sm md:text-base">
                              {item.name}
                            </h3>
                            <p className="font-bold text-red-600 text-sm md:text-base">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                                onClick={() =>
                                  cartUpdateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <span className="w-6 md:w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                                onClick={() =>
                                  cartUpdateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-600/10"
                              onClick={() => cartRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="p-4 bg-white/5 text-center">
                    <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {cartTotalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Entrega</span>
                      <span className="text-green-500">Grátis</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {cartTotalPrice.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        onClick={handleCheckout}
                      >
                        Pagar com PIX
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 p-4">
                  <h3 className="font-bold mb-2 text-center">
                    Forma de Pagamento
                  </h3>
                  <div className="flex justify-center">
                    <div className="bg-red-600 rounded p-2 text-sm font-medium">
                      Pagamento via PIX
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Pagamento instantâneo com 1% de desconto
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="p-4 bg-white/5 text-center">
                    <h2 className="text-xl font-bold">
                      Informações de Entrega
                    </h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name" className="block mb-1">
                          Nome Completo*
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className="bg-black border-white/20"
                          required
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="block mb-1">
                          Email*
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="bg-black border-white/20"
                          required
                          placeholder="Digite seu email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="block mb-1">
                          Telefone*
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="bg-black border-white/20"
                          required
                          placeholder="Digite seu telefone com DDD"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className="block mb-1">
                          Endereço Completo*
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          className="bg-black border-white/20"
                          required
                          placeholder="Rua, Número, Bairro, Cidade - Estado, CEP"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="p-4 bg-white/5 text-center">
                    <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {cartItems.map((item: any) => (
                        <div
                          key={`summary-${item.category}-${item.id}`}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {cartTotalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de Entrega</span>
                        <span className="text-green-500">Grátis</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {cartTotalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={customerInfo.acceptTerms}
                        onCheckedChange={(checked) =>
                          setCustomerInfo({
                            ...customerInfo,
                            acceptTerms: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        Concordo com os termos e condições
                      </Label>
                    </div>

                    <Button
                      className="w-full bg-red-600 text-white hover:bg-red-700"
                      onClick={handleCheckout}
                      disabled={!customerInfo.acceptTerms || isLoading}
                    >
                      {isLoading ? "Gerando PIX..." : "Gerar QR Code PIX"}
                    </Button>

                    {error && (
                      <div className="text-red-500 text-center p-2 bg-red-500/10 rounded">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Voltar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
 <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="bg-black border border-white/20 rounded-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
      {/* Botão de fechar */}
    {showPixPopup && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="bg-black border border-white/20 rounded-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
      {/* Botão de fechar */}
      <button
        onClick={() => setShowPixPopup(false)}
        className="absolute top-4 right-4 hover:text-red-500"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Pagamento via PIX
        </h2>

        <div className="bg-white p-4 rounded-lg">
          <p className="text-black font-bold mb-4">
               Valor:{" "}
               {(pixData.amount / 100).toLocaleString("pt-BR", {
                style: "currency",
               currency: "BRL",
               })}
                  </p>

          {pixData.copyPasteCode ? (
            <div className="bg-black text-white p-3 rounded-lg flex items-center justify-between">
              <code className="text-xs overflow-x-auto break-all flex-1">
                {pixData.copyPasteCode}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (pixData?.copyPasteCode) {
                    navigator.clipboard.writeText(pixData.copyPasteCode)
                      .then(() => alert("Código Pix copiado para a área de transferência!"))
                      .catch(() => alert("Não foi possível copiar o código Pix."));
                  }
                }}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="bg-yellow-500/10 p-4 rounded-lg text-yellow-400">
              Aguardando dados do PIX...
            </div>
          )}
        </div>

        {paymentStatus === "pending" && (
          <p className="text-yellow-400">
            Aguardando confirmação do pagamento...
          </p>
        )}

        {paymentStatus === "paid" && (
          <div className="text-green-500">
            <p>Pagamento confirmado!</p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => {
                setShowPixPopup(false);
                router.push("/");
              }}
            >
              Voltar para a loja
                       </Button>
               </div>
               )}
               </div>
                  </div>
                  </div>
                   )}


      <footer className="w-full border-t border-white/10 bg-black py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:h-16">
          <p className="text-sm text-gray-400">
            © 2024 Shoyo Shoyo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
