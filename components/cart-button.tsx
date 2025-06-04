"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"

export default function CartButton() {
  const { totalItems } = useCart()
  const router = useRouter()

  return (
    <Button
      variant="outline"
      className="relative bg-white text-black hover:bg-gray-100 border border-black shadow-md"
      onClick={() => router.push("/carrinho")}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Carrinho</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
