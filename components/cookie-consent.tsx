"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(true)

  // Sempre mostrar o banner de cookies ao carregar a página
  // Não verificamos localStorage aqui para garantir que o banner sempre apareça

  const acceptCookies = () => {
    // Armazenar a escolha do usuário
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    // Armazenar a escolha do usuário
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md rounded-lg bg-black border border-white/10 p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">Política de Cookies</h3>
        <Button variant="ghost" size="icon" onClick={declineCookies}>
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>
      <p className="mt-2 text-sm text-gray-400">
        Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa
        Política de Privacidade e com o uso de cookies.
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="default" className="bg-white text-black hover:bg-gray-100" onClick={acceptCookies}>
          Aceitar
        </Button>
        <Button
          variant="outline"
          className="bg-white text-black hover:bg-gray-100 border-black"
          onClick={declineCookies}
        >
          Recusar
        </Button>
      </div>
    </div>
  )
}
