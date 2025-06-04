"use client"

import { Truck } from "lucide-react"

export default function PromoMessage() {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-md p-3 md:p-4 my-4 sticky top-16 z-40 shadow-lg">
      <div className="flex items-center justify-center gap-3 flex-nowrap overflow-hidden">
        <Truck className="h-5 w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
        <p className="text-white font-medium text-center whitespace-nowrap text-sm md:text-base">
          PROMOÇÃO DO DIA:{" "}
          <span className="relative inline-block font-bold">
            <span className="relative px-3 py-1 bg-black rounded-md shadow-inner">FRETE GRÁTIS</span>
          </span>{" "}
          EM TODOS OS PEDIDOS
        </p>
      </div>
    </div>
  )
}
