"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

export default function LocationDetector() {
  const [location, setLocation] = useState<string>("Carregando...")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        setIsLoading(true)

        // Usando a API ipapi.co que é gratuita e não requer token para uso básico
        // Esta API tem menos restrições de CORS e é mais confiável para uso no cliente
        const response = await fetch("https://ipapi.co/json/")

        if (!response.ok) {
          throw new Error("Falha ao obter localização")
        }

        const data = await response.json()

        // Criando um endereço fictício baseado nos dados reais da cidade
        // Isso é mais seguro do que mostrar o endereço real do usuário
        const street = "R. Paulista"
        const number = Math.floor(Math.random() * 2000) + 1000 // Número aleatório entre 1000-3000
        let neighborhood = ""

        // Definindo bairros populares baseados na cidade real
        if (data.city) {
          if (data.city === "São Paulo") {
            neighborhood = ["Jardins", "Pinheiros", "Vila Madalena", "Moema", "Itaim Bibi"][
              Math.floor(Math.random() * 5)
            ]
          } else if (data.city === "Rio de Janeiro") {
            neighborhood = ["Copacabana", "Ipanema", "Leblon", "Botafogo", "Tijuca"][Math.floor(Math.random() * 5)]
          } else if (data.city === "Belo Horizonte") {
            neighborhood = ["Savassi", "Lourdes", "Funcionários", "Buritis", "Belvedere"][Math.floor(Math.random() * 5)]
          } else {
            neighborhood = "Centro"
          }
        } else {
          neighborhood = "Jardins"
        }

        // Formatando a localização para incluir rua, número, bairro e cidade
        const locationString = `${street}, ${number} - ${neighborhood}, ${data.city || "São Paulo"}`

        setLocation(locationString)
      } catch (error) {
        console.error("Erro ao obter localização:", error)
        // Valor padrão em caso de erro
        setLocation("R. Paulista, 1500 - Jardins, São Paulo")
      } finally {
        setIsLoading(false)
      }
    }

    getLocationByIP()
  }, [])

  return (
    <div className="flex items-center gap-1 text-sm">
      <MapPin className="h-4 w-4" />
      {isLoading ? <span>Carregando...</span> : <span>{location}</span>}
    </div>
  )
}
