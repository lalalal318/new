"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CategoryMenuProps {
  id?: string
}

export default function CategoryMenu({ id }: CategoryMenuProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const categories = [
    { id: "mais-pedidos", name: "Mais Pedidos" },
    { id: "combos", name: "Combos" },
    { id: "pokes", name: "Pokes" },
    { id: "sushis", name: "Sushis" },
    { id: "promocoes", name: "Promoções" },
    { id: "burritos", name: "Burritos" },
    { id: "festivais", name: "Festivais" },
    { id: "shoyo-top", name: "Shoyo Top" },
    { id: "hot-rolls", name: "Hot Rolls" },
    { id: "yakisobas", name: "Yakisobas" },
    { id: "temakis", name: "Temakis" },
    { id: "boxes", name: "Boxes" },
    { id: "bentos", name: "Bentôs" },
    { id: "shoyo-balls", name: "Shoyo Balls" },
    { id: "kids", name: "Kids" },
    { id: "vegetarianos", name: "Vegetarianos" },
    { id: "bebidas", name: "Bebidas" },
    { id: "extras", name: "Extras" },
    { id: "sobremesas", name: "Sobremesas" },
  ]

  const [activeCategory, setActiveCategory] = useState("mais-pedidos")

  const navigateToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    router.push(`/categoria/${categoryId}`)
  }

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition)
      // Check initial state
      checkScrollPosition()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div id={id} className="relative">
      {/* Setas de navegação para desktop */}
      <div className="hidden md:block">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 rounded-full p-1 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 rounded-full p-1 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        )}
      </div>

      {/* Indicadores de scroll para mobile */}
      <div className="md:hidden flex justify-center mb-2">
        <div className="flex space-x-1">
          {showLeftArrow && <div className="w-2 h-2 rounded-full bg-orange-600"></div>}
          <div className="w-2 h-2 rounded-full bg-white"></div>
          {showRightArrow && <div className="w-2 h-2 rounded-full bg-orange-600"></div>}
        </div>
      </div>

      {/* Container com scroll horizontal */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          WebkitOverflowScrolling: "touch", // Para melhor desempenho de rolagem no iOS
        }}
      >
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap shadow-md ${
                activeCategory === category.id
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-transparent text-white border-white/20 hover:bg-white/10"
              }`}
              onClick={() => navigateToCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Estilo para esconder a scrollbar em navegadores webkit */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
