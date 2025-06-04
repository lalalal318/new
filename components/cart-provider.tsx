"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Carregar carrinho do localStorage quando o componente montar
  useEffect(() => {
    const savedCart = localStorage.getItem("shoyo-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
        localStorage.removeItem("shoyo-cart")
      }
    }
    setIsInitialized(true)
  }, [])

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("shoyo-cart", JSON.stringify(items))
    }
  }, [items, isInitialized])

  // Adicionar item ao carrinho
  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.category === item.category)

      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map((i) =>
          i.id === item.id && i.category === item.category ? { ...i, quantity: i.quantity + 1 } : i,
        )
      } else {
        // Se o item não existe, adiciona com quantidade 1
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  // Remover item do carrinho
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Atualizar quantidade de um item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Limpar carrinho
  const clearCart = () => {
    setItems([])
    localStorage.removeItem("shoyo-cart")
  }

  // Calcular total de itens
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calcular preço total
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
