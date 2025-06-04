"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, MapPin, Phone, ShoppingBag, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartButton from "@/components/cart-button"
import LocationDetector from "@/components/location-detector"
import PromoMessage from "@/components/promo-message"
import ShineButton from "@/components/shine-button"
import { useCart } from "@/components/cart-provider"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AddExtrasDialog from "@/components/add-extras-dialog"

// Definição das categorias
const categories = [
  { id: "mais-pedidos", name: "Mais Pedidos", image: "/mais-pedidos-1.png" },
  { id: "combos", name: "Combos", image: "/combos-1.png" },
  { id: "pokes", name: "Pokes", image: "/pokes-1.png" },
  { id: "sushis", name: "Sushis", image: "/sushis-1.png" },
  { id: "promocoes", name: "Promoções", image: "/promocoes-1.png" },
  { id: "burritos", name: "Burritos", image: "/burritos-1.png" },
  { id: "festivais", name: "Festivais", image: "/festivais-1.png" },
  { id: "shoyo-top", name: "Shoyo Top", image: "/shoyo-top-1.png" },
  { id: "hot-rolls", name: "Hot Rolls", image: "/hot-rolls-1.png" },
  { id: "yakisobas", name: "Yakisobas", image: "/yakisobas-1.png" },
  { id: "temakis", name: "Temakis", image: "/temakis-1.png" },
  { id: "boxes", name: "Boxes", image: "/boxes-1.png" },
  { id: "bentos", name: "Bentôs", image: "/bentos-1.png" },
  { id: "shoyo-balls", name: "Shoyo Balls", image: "/shoyo-balls-1.png" },
  { id: "vegetarianos", name: "Vegetarianos", image: "/vegetarianos-1.png" },
  { id: "bebidas", name: "Bebidas", image: "/bebidas-1.png" },
  { id: "sobremesas", name: "Sobremesas", image: "/sobremesas-1.png" },
  { id: "extras", name: "Extras", image: "/molho-shoyu.png" },
]

// Definição dos produtos por categoria
const productsByCategory = {
  "mais-pedidos": [
    {
      id: 1,
      name: "Hot Roll Especial",
      description: "Hot roll crocante com cobertura de molho especial e cebolinha",
      price: 44.90,
      image: "/mais-pedidos-1.png",
    },
    {
      id: 2,
      name: "Sobremesa de Chocolate com Morango",
      description: "Deliciosa sobremesa com chocolate e morangos frescos em base crocante",
      price: 52.9,
      image: "/mais-pedidos-2.png",
    },
    {
      id: 3,
      name: "Crocante de Salmão",
      description: "Crocante empanado recheado com salmão e cream cheese",
      price: 62.9,
      image: "/mais-pedidos-3.png",
    },
    {
      id: 4,
      name: "Hot Filadélfia Premium",
      description: "Hot roll premium com cobertura cremosa e cebolinha",
      price: 79.9,
      image: "/mais-pedidos-4.png",
    },
    {
      id: 5,
      name: "Combo Temaki + Sushi",
      description: "Temaki de salmão com cebolinha + 10 peças variadas e refrigerante",
      price: 66.9,
      image: "/mais-pedidos-5.png",
    },
  ],
  combos: [
    {
      id: 1,
      name: "Temaki Gigante + Refrigerante",
      description: "Delicioso temaki gigante com refrigerante incluso e frete grátis",
      price: 42.9,
      image: "/combos-promo-1.png",
    },
    {
      id: 2,
      name: "Combo de Lei (22 peças) + Refrigerante",
      description: "22 peças variadas de sushi e sashimi com refrigerante incluso e frete grátis",
      price: 26.9,
      image: "/combos-promo-2.png",
    },
    {
      id: 3,
      name: "Pague 1 Leve 2 + Refrigerante",
      description: "Compre um prato e leve dois, acompanha refrigerante e frete grátis",
      price: 39.9,
      image: "/combos-promo-3.png",
    },
    {
      id: 4,
      name: "Combo 3 Temakis + 8 Hot Rolls + Refrigerante",
      description: "3 temakis de salmão empanado, 8 hot rolls e refrigerante com frete grátis",
      price: 79.9,
      image: "/combos-promo-4.png",
    },
  ],
  pokes: [
    {
      id: 1,
      name: "Poke Tropical",
      description: "Poke com salmão fresco, manga, abacate e molho especial",
      price: 36.9,
      image: "/pokes-1.png",
    },
    {
      id: 2,
      name: "Poke Crocante",
      description: "Poke com frango empanado, vegetais frescos e molho da casa",
      price: 34.9,
      image: "/pokes-2.png",
    },
    {
      id: 3,
      name: "Poke Mix",
      description: "Poke com salmão, camarão empanado, macarrão e vegetais",
      price: 39.9,
      image: "/pokes-3.png",
    },
  ],
  sushis: [
    {
      id: 1,
      name: "Combinado Especial (30 peças)",
      description: "Seleção de sushis variados com salmão, atum e camarão",
      price: 89.9,
      image: "/sushis-1.png",
    },
    {
      id: 2,
      name: "Combinado Família (40 peças)",
      description: "Seleção completa de sushis, sashimis e temakis para compartilhar",
      price: 119.9,
      image: "/sushis-2.png",
    },
    {
      id: 3,
      name: "Combinado Tradicional (25 peças)",
      description: "Seleção de hossomakis, uramakis e sashimis de salmão",
      price: 79.9,
      image: "/sushis-3.png",
    },
    {
      id: 4,
      name: "Barco de Salmão (28 peças)",
      description: "Seleção premium de sashimis e sushis de salmão",
      price: 99.9,
      image: "/sushis-4.png",
    },
  ],
  extras: [
    {
      id: 1,
      name: "Shoyu",
      description: "Molho de soja tradicional (50ml)",
      price: 6.0,
      image: "/molho-shoyu.png",
    },
    {
      id: 2,
      name: "Tarê",
      description: "Molho agridoce para yakisoba (80ml)",
      price: 7.0,
      image: "/molho-tare.png",
    },
    {
      id: 3,
      name: "Wasabi",
      description: "Pasta picante tradicional (30ml)",
      price: 5.0,
      image: "/molho-wasabi.png",
    },
    {
      id: 4,
      name: "Agridoce Oriental",
      description: "Molho agridoce para entrada (50ml)",
      price: 6.0,
      image: "/molho-agridoce.png",
    },
  ],
}

// Componente para exibir um produto
interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
  }
  category: string
  onAddToCart: () => void
}

// Melhorar o espaçamento e tamanho dos elementos para o ProductCard
function ProductCard({ product, category, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="bg-black border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all cursor-pointer shadow-md"
      onClick={onAddToCart}
    >
      <div className="aspect-square relative">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm md:text-base truncate mb-1">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-400 line-clamp-2 h-8 mb-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-orange-600 text-base md:text-lg">R$ {product.price.toFixed(2)}</span>
          <Button
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full h-9 w-9 p-0 flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.stopPropagation() // Prevent triggering the parent onClick
              onAddToCart()
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Componente para exibir uma categoria
interface CategoryCardProps {
  category: {
    id: string
    name: string
    image: string
  }
  onClick: () => void
  isActive: boolean
}

// Melhorar o CategoryCard para melhor visualização em mobile
function CategoryCard({ category, onClick, isActive }: CategoryCardProps) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer p-2 ${
        isActive ? "border-b-2 border-orange-600 bg-orange-600/10" : "border-b-2 border-transparent hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <div className="w-16 h-16 md:w-18 md:h-18 relative rounded-full overflow-hidden border-2 border-white/20 mb-2 shadow-md">
        <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
      </div>
      <span className="text-xs md:text-sm text-center font-medium">{category.name}</span>
    </div>
  )
}

// Componente principal da página
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("mais-pedidos")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isExtrasDialogOpen, setIsExtrasDialogOpen] = useState(false)
  const [productForExtras, setProductForExtras] = useState<any>(null)
  const { addItem } = useCart()

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    // Garantir que a página volte ao topo quando for carregada
    window.scrollTo(0, 0)
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)

    // Scroll para a seção da categoria
    if (categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false)
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Buscar em todas as categorias
    const results: any[] = []
    Object.entries(productsByCategory).forEach(([category, products]) => {
      const matchingProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      matchingProducts.forEach((product) => {
        results.push({
          ...product,
          category,
        })
      })
    })

    setSearchResults(results)
  }

  const handleAddToCart = (product: any, category: string) => {
    // Não mostrar o diálogo de extras para a categoria "extras"
    if (category === "extras") {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: category,
      })
      return
    }

    // Para todas as outras categorias, mostrar o diálogo de extras
    setProductForExtras({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: category,
    })
    setIsExtrasDialogOpen(true)
  }

  const handleCloseExtrasDialog = () => {
    setIsExtrasDialogOpen(false)
    setProductForExtras(null)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsProductDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                SHOYO <span className="text-orange-600">SHOYO</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#categorias" className="text-sm font-medium hover:text-gray-300">
              MENU
            </a>
            <a href="#sobre" className="text-sm font-medium hover:text-gray-300">
              SOBRE
            </a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-gray-300">
              DEPOIMENTOS
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-gray-300">
              CONTATO
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/shoyoshoyo.delivery?igsh=OWI1ZGM3YnoyNjBt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-sushi.png" alt="Background" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  SHOYO <span className="text-orange-600">SHOYO</span>
                </h1>
                <p className="max-w-[600px] mx-auto lg:mx-0 text-gray-300 md:text-xl">
                  Descubra o sabor da tradição japonesa com um toque contemporâneo. Ingredientes frescos, ambiente
                  sofisticado e uma experiência única em cada peça de sushi
                </p>
                <div className="flex items-center justify-center lg:justify-start mt-2">
                  <LocationDetector />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                <ShineButton
                  variant="orange"
                  onClick={() => {
                    const categoriesSection = document.getElementById("categorias")
                    if (categoriesSection) {
                      categoriesSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="font-bold hover:scale-105 transition-transform duration-300"
                >
                  VER MENU
                </ShineButton>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-[280px] h-[450px] md:w-[350px] md:h-[0px] relative">
                <Image
                  src="/panda-mascot.png"
                  alt="Shoyo Shoyo Panda Mascote"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Message */}
      <div className="container px-4 md:px-6 py-2">
        <PromoMessage />
      </div>

      {/* Search Bar */}
      <div className="container px-4 md:px-6 py-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="pl-10 bg-black border-white/20 rounded-full shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onBlur={handleSearch}
          />
        </div>
      </div>

      {/* Categories Section */}
      <section id="categorias" className="py-6 bg-black scroll-mt-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left">Categorias</h2>
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex space-x-3 min-w-max">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category.id)}
                  isActive={activeCategory === category.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {isSearching && searchResults.length > 0 && (
        <section className="py-8 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Resultados da busca</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSearching(false)
                  setSearchQuery("")
                  setSearchResults([])
                }}
                className="text-sm"
              >
                Limpar
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={`${product.category}-${product.id}`}
                  product={product}
                  category={product.category}
                  onAddToCart={() => handleAddToCart(product, product.category)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products by Category */}
      {!isSearching &&
        Object.entries(productsByCategory).map(([categoryId, products]) => (
          <section
            key={categoryId}
            id={categoryId}
            className="py-8 bg-black scroll-mt-20 border-t border-white/5"
            ref={(el) => (categoryRefs.current[categoryId] = el)}
          >
            <div className="container px-4 md:px-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold">{categories.find((c) => c.id === categoryId)?.name}</h2>
                <Button variant="ghost" size="sm" asChild className="text-orange-500 hover:text-orange-600">
                  <Link href={`/categoria/${categoryId}`} className="flex items-center">
                    Ver todos <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={`${categoryId}-${product.id}`}
                    product={product}
                    category={categoryId}
                    onAddToCart={() => handleAddToCart(product, categoryId)}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

      {/* About Section */}
      <section id="sobre" className="py-12 md:py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex items-center justify-center relative">
                <div className="text-4xl md:text-6xl font-bold text-center">
                  <span>SHOYO</span>
                  <br />
                  <span className="text-orange-600">SHOYO</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left order-1 lg:order-2">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">SOBRE O SHOYO SHOYO</h2>
                <p className="text-gray-400 md:text-xl">
                  No Shoyo Shoyo, contemplamos o melhor da gastronomia japonesa, com os mais frescos e exclusivos
                  insumos, tudo isso em um espaço intimista que respira autenticidade.
                </p>
                <p className="text-gray-400 md:text-xl">
                  Desde os clássicos sushi e sashimi até inovações contemporâneas, nosso menu é uma celebração da rica
                  gastronomia oriental.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Button className="w-fit bg-orange-600 text-white hover:bg-orange-700" asChild>
                  <Link href="/historia">CONHEÇA NOSSA HISTÓRIA</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-12 md:py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">DEPOIMENTOS</h2>
            <p className="max-w-[700px] text-gray-300 md:text-xl">O que nossos clientes dizem sobre nós</p>
          </div>
          <div className="mx-auto grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
              <div className="flex items-center justify-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Os melhores sushis que já comi! Ingredientes frescos e apresentação impecável. Recomendo o combo
                família, vale muito a pena!"
              </p>
              <div>
                <p className="font-bold">Ana Silva</p>
                <p className="text-sm text-gray-400">Cliente desde 2022</p>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
              <div className="flex items-center justify-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Ambiente aconchegante e atendimento excepcional. Os hot rolls são simplesmente divinos. Já virou meu
                restaurante japonês favorito!"
              </p>
              <div>
                <p className="font-bold">Carlos Oliveira</p>
                <p className="text-sm text-gray-400">Cliente desde 2021</p>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
              <div className="flex items-center justify-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Pedi delivery e fiquei impressionada com a rapidez e a qualidade. Os sushis chegaram perfeitos e muito
                saborosos. Super recomendo!"
              </p>
              <div>
                <p className="font-bold">Mariana Santos</p>
                <p className="text-sm text-gray-400">Cliente desde 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-12 md:py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">CONTATO</h2>
                <p className="text-gray-400 md:text-xl">
                  Entre em contato conosco para fazer sua reserva ou tirar dúvidas.
                </p>
              </div>
              <div className="grid gap-4 mx-auto lg:mx-0 max-w-[300px]">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Phone className="h-5 w-5" />
                  <span>(11) 989865-967</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <MapPin className="h-5 w-5" />
                  <span>Mario Granada 323- São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Instagram className="h-5 w-5" />
                  <Link
                    href="https://www.instagram.com/shoyoshoyo.delivery?igsh=OWI1ZGM3YnoyNjBt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @shoyoshoyo.delivery
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 text-center lg:text-left">
                <h3 className="text-xl font-bold">Atendimento todos os dias da semana é das 18h às 5h</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-center lg:text-left">Envie uma Mensagem</h3>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-center lg:text-left">
                    Nome
                  </label>
                  <input
                    id="name"
                    className="w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-center lg:text-left">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm"
                    placeholder="Seu email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-center lg:text-left">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    className="w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm"
                    placeholder="Sua mensagem"
                    rows={4}
                  ></textarea>
                </div>
                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">ENVIAR MENSAGEM</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:h-16">
          <p className="text-sm text-gray-400 text-center">© 2024 Shoyo Shoyo. Todos os direitos reservados.</p>
          <nav className="flex gap-4 sm:gap-6 justify-center">
            <Link href="/terms" className="text-sm font-medium text-gray-400 hover:underline">
              Termos de Uso
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-400 hover:underline">
              Política de Privacidade
            </Link>
          </nav>
        </div>
      </footer>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="bg-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 aspect-square relative">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                  <p className="text-xl font-bold text-orange-600 mb-4">R$ {selectedProduct.price.toFixed(2)}</p>
                </div>
                <Button
                  className="w-full bg-orange-600 text-white hover:bg-orange-700"
                  onClick={() => {
                    handleAddToCart(selectedProduct, selectedProduct.category)
                    setIsProductDialogOpen(false)
                  }}
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Extras Dialog */}
      {productForExtras && (
        <AddExtrasDialog isOpen={isExtrasDialogOpen} onClose={handleCloseExtrasDialog} product={productForExtras} />
      )}
    </div>
  )
}
