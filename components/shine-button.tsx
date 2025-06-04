"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ShineButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "white" | "red" | "orange"
}

export default function ShineButton({ children, className, onClick, variant = "white" }: ShineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-6 py-3 font-medium rounded-md transition-all shine-button",
        variant === "red"
          ? "bg-red-600 text-white hover:bg-red-700 shine-button-red"
          : variant === "orange"
            ? "bg-orange-600 text-white hover:bg-orange-700 shine-button-orange"
            : "bg-white text-black hover:bg-gray-100 border border-black",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "absolute top-0 left-[-100%] w-[35%] h-full bg-gradient-to-r shine-effect",
          variant === "red" || variant === "orange"
            ? "from-transparent via-white/30 to-transparent"
            : "from-transparent via-white to-transparent",
        )}
      ></span>
    </button>
  )
}
