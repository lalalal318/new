"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export interface ExtraItem {
  id: number
  name: string
  price: number
  image: string
  description?: string
}

interface AddExtrasDialogProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    image: string
    category: string
  }
}

const extras: ExtraItem[] = [
  {
    id: 1,
    name: "Shoyu",
    price: 6.0,
    image: "/molho-shoyu.png",
    description: "Molho de soja tradicional (50ml)",
  },
  {
    id: 2,
    name: "Tarê",
    price: 7.0,
    image: "/molho-tare.png",
    description: "Molho agridoce para yakisoba (80ml)",
  },
  {
    id: 3,
    name: "Wasabi",
    price: 5.0,
    image: "/molho-wasabi.png",
    description: "Pasta picante tradicional (30ml)",
  },
  {
    id: 4,
    name: "Agridoce Oriental",
    price: 6.0,
    image: "/molho-agridoce.png",
    description: "Molho agridoce para entrada (50ml)",
  },
]

export default function AddExtrasDialog({ isOpen, onClose, product }: AddExtrasDialogProps) {
  const { addItem } = useCart()
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])
  const router = useRouter()

  const handleExtraToggle = (extraId: number) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]))
  }

  // Modificar a função handleAddToCart para retornar o cliente para onde estava
  const handleAddToCart = () => {
    // Adicionar o produto principal ao carrinho
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    // Adicionar os extras selecionados ao carrinho
    selectedExtras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId)
      if (extra) {
        addItem({
          id: extra.id,
          name: `${extra.name} (Extra)`,
          price: extra.price,
          image: extra.image,
          category: "extras",
        })
      }
    })

    // Mostrar notificação de sucesso
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: "top-right",
    })

    // Fechar o diálogo e limpar a seleção
    onClose()
    setSelectedExtras([])
    // Não redireciona - mantém o cliente na mesma página para continuar comprando
  }

  // Renomear handleSkipExtras para handleBuyNow e modificar para redirecionar ao checkout
  const handleBuyNow = () => {
    // Adicionar o produto principal ao carrinho
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    // Adicionar os extras selecionados ao carrinho
    selectedExtras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId)
      if (extra) {
        addItem({
          id: extra.id,
          name: `${extra.name} (Extra)`,
          price: extra.price,
          image: extra.image,
          category: "extras",
        })
      }
    })

    // Mostrar notificação de sucesso
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: "top-right",
    })

    // Fechar o diálogo e limpar a seleção
    onClose()
    setSelectedExtras([])

    // Redirecionar para a página de checkout
    router.push("/carrinho")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Melhorar o diálogo de extras para melhor visualização em mobile */}
      <DialogContent className="bg-black border border-white/10 text-white max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Deseja adicionar molhos extras?</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-400 mb-6 text-center">Selecione os molhos que deseja adicionar ao seu pedido:</p>

          <div className="space-y-4 max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-2">
            {extras.map((extra) => (
              <div
                key={extra.id}
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedExtras.includes(extra.id)
                    ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/20"
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
                onClick={() => handleExtraToggle(extra.id)}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 bg-gradient-to-br from-red-800 to-red-600 rounded-md overflow-hidden shadow-md">
                  <Image src={extra.image || "/placeholder.svg"} alt={extra.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-base md:text-lg">{extra.name}</h3>
                      <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                        {extra.description}
                      </p>
                      <p className="text-sm md:text-base text-white font-medium mt-1">R$ {extra.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`extra-${extra.id}`}
                        checked={selectedExtras.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                        onClick={(e) => e.stopPropagation()} // Evita duplo clique quando o checkbox é clicado diretamente
                        className="pointer-events-none h-5 w-5" // Torna o checkbox apenas visual, já que o card inteiro é clicável
                      />
                      <Label htmlFor={`extra-${extra.id}`} className="sr-only">
                        Selecionar {extra.name}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto font-medium border-orange-600 text-orange-600 hover:bg-orange-600/10 py-6 text-base"
            onClick={handleBuyNow}
          >
            Comprar Agora
          </Button>
          <Button
            className="w-full sm:w-auto bg-orange-600 text-white hover:bg-orange-700 font-medium py-6 text-base"
            onClick={handleAddToCart}
          >
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
