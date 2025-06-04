"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CartButton from "@/components/cart-button"
import AddExtrasDialog from "@/components/add-extras-dialog"
import CategoryMenu from "@/components/category-menu"
import PromoMessage from "@/components/promo-message"

interface CategoryPageProps {
  params: {
    categoria: string
  }
}

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = params
  const [items, setItems] = useState<MenuItem[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [isExtrasDialogOpen, setIsExtrasDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null)

  useEffect(() => {
    // Garantir que a página volte ao topo quando for carregada
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Mapear o ID da categoria para um nome mais amigável
    const categoryMap: Record<string, string> = {
      "mais-pedidos": "Mais Pedidos",
      combos: "Combos",
      pokes: "Pokes",
      sushis: "Sushis",
      promocoes: "Promoções",
      burritos: "Burritos",
      festivais: "Festivais",
      "shoyo-top": "Shoyo Top",
      "hot-rolls": "Hot Rolls",
      yakisobas: "Yakisobas",
      temakis: "Temakis",
      boxes: "Boxes",
      bentos: "Bentôs",
      "shoyo-balls": "Shoyo Balls",
      kids: "Kids",
      vegetarianos: "Vegetarianos",
      bebidas: "Bebidas",
      extras: "Extras",
      sobremesas: "Sobremesas",
    }

    setCategoryName(categoryMap[categoria] || categoria)

    // Gerar itens de menu baseados na categoria
    const generateItems = () => {
      // Se for a categoria "extras", mostrar os 4 molhos
      if (categoria === "extras") {
        setItems([
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
        ])
        return
      }

      // Se for a categoria "festivais", usar as imagens específicas
      if (categoria === "festivais") {
        setItems([
          {
            id: 1,
            name: "Festival Tábua Premium",
            description: "Combinado especial com 40 peças variadas incluindo sashimi, uramaki e hot roll",
            price: 149.9,
            image: "/festivais-1.png",
          },
          {
            id: 2,
            name: "Festival Flor de Lótus",
            description: "Combinado premium com 25 peças selecionadas e decoração especial",
            price: 129.9,
            image: "/festivais-2.png",
          },
          {
            id: 3,
            name: "Festival Barco Shoyo",
            description: "Combinado em formato de barco com 50 peças incluindo sashimi premium de salmão",
            price: 189.9,
            image: "/festivais-3.png",
          },
          {
            id: 4,
            name: "Festival Salmão Especial",
            description: "Combinado com 35 peças com foco em salmão fresco e variações de sushi",
            price: 159.9,
            image: "/festivais-4.png",
          },
          {
            id: 5,
            name: "Festival Completo",
            description: "Banquete japonês com combinado principal e 8 acompanhamentos variados",
            price: 219.9,
            image: "/festivais-5.png",
          },
        ])
        return
      }

      // Se for a categoria "shoyo-balls", usar as imagens específicas
      if (categoria === "shoyo-balls") {
        setItems([
          {
            id: 1,
            name: "Shoyo Balls Clássico",
            description: "Bolinhas crocantes de arroz recheadas com salmão e cream cheese",
            price: 24.9,
            image: "/shoyo-balls-1.png",
          },
          {
            id: 2,
            name: "Shoyo Balls Especial",
            description: "Bolinhas crocantes com cobertura de cream cheese e cebolinha",
            price: 26.9,
            image: "/shoyo-balls-2.png",
          },
          {
            id: 3,
            name: "Shoyo Balls Premium",
            description: "Bolinhas crocantes servidas com molho especial e limão",
            price: 28.9,
            image: "/shoyo-balls-3.png",
          },
          {
            id: 4,
            name: "Shoyo Balls Mix",
            description: "Bolinhas crocantes servidas com molho shoyu especial",
            price: 25.9,
            image: "/shoyo-balls-4.png",
          },
          {
            id: 5,
            name: "Shoyo Balls Tradicional",
            description: "Bolinhas crocantes com cebolinha servidas com alface e limão",
            price: 22.9,
            image: "/shoyo-balls-5.png",
          },
          {
            id: 6,
            name: "Shoyo Balls com Molho",
            description: "Bolinhas crocantes servidas com molho teriyaki especial",
            price: 23.9,
            image: "/shoyo-balls-6.png",
          },
        ])
        return
      }

      // Se for a categoria "promocoes", usar as imagens específicas
      if (categoria === "promocoes") {
        setItems([
          {
            id: 1,
            name: "Hot Roll Especial + Refrigerante",
            description:
              "8 unidades de hot roll especial de salmão com cream cheese + 1 Coca-Cola lata. Promoção por tempo limitado!",
            price: 29.9,
            image: "/promocoes-1.png",
          },
          {
            id: 2,
            name: "Combo Família + Coca-Cola 1,5L",
            description:
              "Combinado com 24 peças variadas incluindo uramaki, hot roll e guioza + Coca-Cola 1,5L. Ideal para 2-3 pessoas!",
            price: 69.9,
            image: "/promocoes-2.png",
          },
          {
            id: 3,
            name: "Hot Roll Premium + Coca-Cola",
            description:
              "10 unidades de hot roll premium com cobertura especial + 1 Coca-Cola copo. Exclusivo para delivery!",
            price: 34.9,
            image: "/promocoes-3.png",
          },
          {
            id: 4,
            name: "Uramaki Especial + Coca-Cola",
            description:
              "12 unidades de uramaki especial com molho teriyaki e cream cheese + 1 Coca-Cola copo grande. Promoção exclusiva!",
            price: 39.9,
            image: "/promocoes-4.png",
          },
          {
            id: 5,
            name: "Hot Filadélfia + Coca-Cola",
            description:
              "24 unidades de hot filadélfia com cream cheese e salmão + 1 Coca-Cola lata. Promoção imperdível por tempo limitado!",
            price: 49.9,
            image: "/promocoes-5.png",
          },
        ])
        return
      }

      // Se for a categoria "boxes", usar as imagens específicas
      if (categoria === "boxes") {
        setItems([
          {
            id: 1,
            name: "Box Heiwa",
            description:
              "Box premium com seleção de sushi, hot roll, sashimi e pratos quentes. Ideal para 2 pessoas. Acompanha hashi e molhos.",
            price: 89.9,
            image: "/boxes-1.png",
          },
          {
            id: 2,
            name: "Bento Box Tradicional",
            description:
              "Box tradicional japonês com compartimentos para sashimi, tempura, arroz e salada. Experiência gastronômica completa!",
            price: 74.9,
            image: "/boxes-2.png",
          },
          {
            id: 3,
            name: "Box Sushi Especial",
            description:
              "Box de madeira com seleção de sushi, sashimi, nigiri e acompanhamentos. Perfeito para uma refeição completa!",
            price: 69.9,
            image: "/boxes-3.png",
          },
        ])
        return
      }

      // Se for a categoria "kids", usar as imagens específicas
      if (categoria === "kids") {
        setItems([
          {
            id: 1,
            name: "Menu Kids Smile",
            description:
              "Batatas em formato de carinha feliz, suco Vigor Kids e brinde surpresa. Opção divertida para as crianças!",
            price: 24.9,
            image: "/kids-1.png",
          },
          {
            id: 2,
            name: "Menu Kids Nuggets",
            description:
              "Nuggets crocantes, molho especial, suco Vigor Kids e brinde surpresa. A escolha favorita da criançada!",
            price: 26.9,
            image: "/kids-2.png",
          },
        ])
        return
      }

      // Se for a categoria "sobremesas", usar as imagens específicas
      if (categoria === "sobremesas") {
        setItems([
          {
            id: 1,
            name: "Mochi de Morango",
            description: "Tradicional doce japonês de massa de arroz com recheio de morango",
            price: 14.9,
            image: "/sobremesas-1.png",
          },
          {
            id: 2,
            name: "Banana Caramelizada com Sorvete",
            description: "Banana caramelizada servida com sorvete de baunilha e canela",
            price: 18.9,
            image: "/sobremesas-2.png",
          },
          {
            id: 3,
            name: "Brownie de Chocolate com Morango",
            description: "Brownie de chocolate meio amargo com morangos frescos e calda",
            price: 16.9,
            image: "/sobremesas-3.png",
          },
          {
            id: 4,
            name: "Rolinho Doce com Sorvete",
            description: "Rolinhos crocantes de massa filo com sorvete de baunilha e calda",
            price: 19.9,
            image: "/sobremesas-4.png",
          },
          {
            id: 5,
            name: "Brownie de Chocolate com Banana",
            description: "Brownie de chocolate com banana e marshmallow",
            price: 17.9,
            image: "/sobremesas-5.png",
          },
        ])
        return
      }

      // Se for a categoria "vegetarianos", usar as imagens específicas
      if (categoria === "vegetarianos") {
        setItems([
          {
            id: 1,
            name: "Nigiri Vegetariano",
            description: "Seleção de nigiris com tofu, cenoura e brócolis",
            price: 28.9,
            image: "/vegetarianos-1.png",
          },
          {
            id: 2,
            name: "Prato Vegetariano Especial",
            description: "Combinado vegetariano com sushis variados e abacate",
            price: 42.9,
            image: "/vegetarianos-2.png",
          },
          {
            id: 3,
            name: "Onigiri Panda",
            description: "Bolinhos de arroz em formato de panda com recheio vegetariano",
            price: 24.9,
            image: "/vegetarianos-3.png",
          },
          {
            id: 4,
            name: "Maki Vegetariano",
            description: "Rolinhos de arroz com pepino, cenoura e abacate",
            price: 26.9,
            image: "/vegetarianos-4.png",
          },
          {
            id: 5,
            name: "Onigiri Vegetariano",
            description: "Triângulos de arroz com recheios vegetarianos variados",
            price: 22.9,
            image: "/vegetarianos-5.png",
          },
        ])
        return
      }

      // Se for a categoria "temakis", usar as imagens específicas
      if (categoria === "temakis") {
        setItems([
          {
            id: 1,
            name: "Temaki Salmão com Manga",
            description: "Temaki de salmão fresco com manga e cream cheese",
            price: 24.9,
            image: "/temakis-1.png",
          },
          {
            id: 2,
            name: "Temaki Salmão Especial",
            description: "Temaki recheado com cubos de salmão fresco e gergelim",
            price: 26.9,
            image: "/temakis-2.png",
          },
          {
            id: 3,
            name: "Hot Temaki Cream",
            description: "Temaki empanado com cream cheese, cebolinha e molho especial",
            price: 28.9,
            image: "/temakis-3.png",
          },
          {
            id: 4,
            name: "Hot Temaki Tradicional",
            description: "Temaki empanado e frito com recheio tradicional",
            price: 25.9,
            image: "/temakis-4.png",
          },
          {
            id: 5,
            name: "Hot Temaki Premium",
            description: "Temaki empanado com cream cheese, cebolinha e molho teriyaki",
            price: 29.9,
            image: "/temakis-5.png",
          },
          {
            id: 6,
            name: "Temaki Spicy Tuna",
            description: "Temaki com atum picante, cebolinha e molho especial",
            price: 27.9,
            image: "/temakis-6.png",
          },
        ])
        return
      }

      // Se for a categoria "bentos", usar as imagens específicas
      if (categoria === "bentos") {
        setItems([
          {
            id: 1,
            name: "Bento Box Completo",
            description: "Box com sashimi, uramaki, hot roll e sunomono",
            price: 69.9,
            image: "/bentos-1.png",
          },
          {
            id: 2,
            name: "Bento Box Temaki",
            description: "Box com temaki, nigiri, hot roll e sashimi",
            price: 64.9,
            image: "/bentos-2.png",
          },
          {
            id: 3,
            name: "Bento Box Especial",
            description: "Box com variedade de rolls, uramaki e hot rolls",
            price: 74.9,
            image: "/bentos-3.png",
          },
          {
            id: 4,
            name: "Bento Box Salmão",
            description: "Box com seleção especial de sushi e sashimi de salmão",
            price: 79.9,
            image: "/bentos-4.png",
          },
        ])
        return
      }

      // Se for a categoria "hot-rolls", usar as imagens específicas
      if (categoria === "hot-rolls") {
        setItems([
          {
            id: 1,
            name: "Hot Roll Salmão",
            description: "Hot roll de salmão com cream cheese, empanado e frito",
            price: 28.9,
            image: "/hot-rolls-1.png",
          },
          {
            id: 2,
            name: "Combinado Hot Rolls",
            description: "Seleção variada de hot rolls e sushis tradicionais",
            price: 42.9,
            image: "/hot-rolls-2.png",
          },
          {
            id: 3,
            name: "Hot Roll Premium",
            description: "Variedade de hot rolls especiais com diferentes recheios",
            price: 39.9,
            image: "/hot-rolls-3.png",
          },
          {
            id: 4,
            name: "Hot Roll de Chocolate",
            description: "Hot roll doce com recheio de chocolate e banana",
            price: 24.9,
            image: "/hot-rolls-4.png",
          },
        ])
        return
      }

      // Se for a categoria "yakisobas", usar as imagens específicas
      if (categoria === "yakisobas") {
        setItems([
          {
            id: 1,
            name: "Yakisoba de Carne",
            description: "Yakisoba tradicional com tiras de carne, legumes e molho especial",
            price: 32.9,
            image: "/yakisobas-1.png",
          },
          {
            id: 2,
            name: "Yakisoba de Frango",
            description: "Yakisoba com frango em cubos, brócolis, cenoura e molho da casa",
            price: 29.9,
            image: "/yakisobas-2.png",
          },
          {
            id: 3,
            name: "Yakisoba Misto",
            description: "Yakisoba com carne, frango, legumes variados e molho especial",
            price: 34.9,
            image: "/yakisobas-3.png",
          },
          {
            id: 4,
            name: "Yakisoba Especial",
            description: "Yakisoba com carne, frango, brócolis e molho especial da casa",
            price: 36.9,
            image: "/yakisobas-4.png",
          },
          {
            id: 5,
            name: "Yakisoba Premium",
            description: "Yakisoba premium com carnes selecionadas, legumes frescos e molho especial",
            price: 39.9,
            image: "/yakisobas-5.png",
          },
        ])
        return
      }

      // Se for a categoria "bebidas", usar as imagens específicas
      if (categoria === "bebidas") {
        setItems([
          {
            id: 1,
            name: "Guaraná Antarctica 2L",
            description: "Refrigerante Guaraná Antarctica 2 litros",
            price: 12.9,
            image: "/bebidas-1.png",
          },
          {
            id: 2,
            name: "H2OH! Limoneto 500ml",
            description: "Água saborizada H2OH! sabor limão 500ml",
            price: 7.9,
            image: "/bebidas-2.png",
          },
          {
            id: 3,
            name: "Guaraná Antarctica Lata 350ml",
            description: "Refrigerante Guaraná Antarctica lata 350ml",
            price: 5.9,
            image: "/bebidas-3.png",
          },
          {
            id: 4,
            name: "Coca-Cola Lata 350ml",
            description: "Refrigerante Coca-Cola lata 350ml",
            price: 5.9,
            image: "/bebidas-4.png",
          },
        ])
        return
      }

      // Se for a categoria "sushis", usar as imagens específicas
      if (categoria === "sushis") {
        setItems([
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
          {
            id: 5,
            name: "Combinado Premium (35 peças)",
            description: "Seleção especial com sushis, sashimis e hots variados",
            price: 129.9,
            image: "/sushis-5.png",
          },
          {
            id: 6,
            name: "Combinado Deluxe (32 peças)",
            description: "Seleção sofisticada com sushis especiais e uramakis",
            price: 109.9,
            image: "/sushis-6.png",
          },
        ])
        return
      }

      // Atualizar a seção "mais-pedidos" na página de categoria
      // Se for a categoria "mais-pedidos", usar as imagens específicas
      if (categoria === "mais-pedidos") {
        setItems([
          {
            id: 1,
            name: "Hot Roll Especial",
            description: "Hot roll crocante com cobertura de molho especial e cebolinha",
            price: 52.9,
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
        ])
        return
      }

      // Se for a categoria "combos", usar as imagens promocionais
      if (categoria === "combos") {
        setItems([
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
        ])
        return
      }

      // Se for a categoria "pokes", usar as imagens específicas
      if (categoria === "pokes") {
        setItems([
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
        ])
        return
      }

      // Se for a categoria "burritos", usar as imagens específicas
      if (categoria === "burritos") {
        setItems([
          {
            id: 1,
            name: "Sushi Burger Especial",
            description: "Hambúrguer de sushi com salmão, cream cheese e algas",
            price: 32.9,
            image: "/burritos-1.png",
          },
          {
            id: 2,
            name: "Sushi Burger Tradicional",
            description: "Hambúrguer de sushi com salmão, cream cheese e cebolinha",
            price: 29.9,
            image: "/burritos-2.png",
          },
        ])
        return
      }

      // Se for a categoria "shoyo-top", usar as imagens específicas
      if (categoria === "shoyo-top") {
        setItems([
          {
            id: 1,
            name: "Box Yakisoba Premium",
            description: "Delicioso yakisoba com legumes frescos e proteína à sua escolha",
            price: 42.9,
            image: "/shoyo-top-1.png",
          },
          {
            id: 2,
            name: "Combo Sushi Especial",
            description: "Seleção premium de sushis e sashimis frescos em caixa elegante",
            price: 49.9,
            image: "/shoyo-top-2.png",
          },
          {
            id: 3,
            name: "Bento Box Tradicional",
            description: "Box com arroz, yakisoba, rolinho primavera e tonkatsu",
            price: 39.9,
            image: "/shoyo-top-3.png",
          },
          {
            id: 4,
            name: "Sashimi Premium Box",
            description: "Seleção de sashimis frescos de salmão, atum e peixe branco",
            price: 54.9,
            image: "/shoyo-top-4.png",
          },
          {
            id: 5,
            name: "Sapporo Box Especial",
            description: "Mix de sashimis, uramakis e hossomakis em caixa especial",
            price: 47.9,
            image: "/shoyo-top-5.png",
          },
        ])
        return
      }

      // Para outras categorias, manter a lógica original
      const count = Math.floor(Math.random() * 8) + 4 // Entre 4 e 12 itens
      const newItems: MenuItem[] = []

      for (let i = 1; i <= count; i++) {
        const basePrice =
          categoria === "combos"
            ? 39.9
            : categoria === "pokes"
              ? 32.9
              : categoria === "sushis"
                ? 28.9
                : categoria === "promocoes"
                  ? 39.9
                  : categoria === "burritos"
                    ? 26.9
                    : categoria === "festivais"
                      ? 59.9
                      : categoria === "shoyo-top"
                        ? 42.9
                        : categoria === "hot-rolls"
                          ? 24.9
                          : categoria === "yakisobas"
                            ? 29.9
                            : categoria === "temakis"
                              ? 22.9
                              : categoria === "boxes"
                                ? 49.9
                                : categoria === "bentos"
                                  ? 39.9
                                  : categoria === "shoyo-balls"
                                    ? 19.9
                                    : categoria === "kids"
                                      ? 16.9
                                      : categoria === "vegetarianos"
                                        ? 24.9
                                        : categoria === "bebidas"
                                          ? 7.9
                                          : categoria === "extras"
                                            ? 5.9
                                            : categoria === "sobremesas"
                                              ? 14.9
                                              : 19.9

        const priceIncrement =
          categoria === "combos"
            ? 5
            : categoria === "festivais"
              ? 10
              : categoria === "boxes"
                ? 10
                : categoria === "promocoes"
                  ? 5
                  : 3

        newItems.push({
          id: i,
          name:
            categoria === "mais-pedidos"
              ? `Item Popular ${i}`
              : categoria === "combos"
                ? `Combo ${i}`
                : categoria === "pokes"
                  ? `Poke ${i}`
                  : categoria === "sushis"
                    ? `Sushi ${i}`
                    : categoria === "promocoes"
                      ? `Promoção ${i}`
                      : categoria === "burritos"
                        ? `Burrito ${i}`
                        : categoria === "festivais"
                          ? `Festival ${i}`
                          : categoria === "shoyo-top"
                            ? `Shoyo Top ${i}`
                            : categoria === "hot-rolls"
                              ? `Hot Roll ${i}`
                              : categoria === "yakisobas"
                                ? `Yakisoba ${i}`
                                : categoria === "temakis"
                                  ? `Temaki ${i}`
                                  : categoria === "boxes"
                                    ? `Box ${i}`
                                    : categoria === "bentos"
                                      ? `Bentô ${i}`
                                      : categoria === "shoyo-balls"
                                        ? `Shoyo Ball ${i}`
                                        : categoria === "kids"
                                          ? `Menu Kids ${i}`
                                          : categoria === "vegetarianos"
                                            ? `Vegetariano ${i}`
                                            : categoria === "bebidas"
                                              ? `Bebida ${i}`
                                              : categoria === "extras"
                                                ? `Extra ${i}`
                                                : categoria === "sobremesas"
                                                  ? `Sobremesa ${i}`
                                                  : `Item ${i}`,
          description: `Delicioso ${categoryName.toLowerCase().slice(0, -1)} preparado com ingredientes frescos`,
          price: basePrice + (i - 1) * priceIncrement,
          image: `/${categoria.toLowerCase()}-${(i % 3) + 1}.png`,
        })
      }

      setItems(newItems)
    }

    generateItems()
  }, [categoria])

  const handleAddToCart = (item: MenuItem) => {
    // Abrir o diálogo de extras
    setSelectedProduct(item)
    setIsExtrasDialogOpen(true)
  }

  const handleCloseExtrasDialog = () => {
    setIsExtrasDialogOpen(false)
    setSelectedProduct(null)
  }

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
          <nav className="hidden md:flex gap-6">
            <Link href="/categoria/mais-pedidos" className="text-sm font-medium hover:text-gray-300">
              MENU
            </Link>
            <Link href="/categoria/combos" className="text-sm font-medium hover:text-gray-300">
              COMBOS
            </Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-gray-300">
              SOBRE
            </Link>
            <Link href="/#depoimentos" className="text-sm font-medium hover:text-gray-300">
              DEPOIMENTOS
            </Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-gray-300">
              CONTATO
            </Link>
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
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col items-center text-center mb-8">
            <Button asChild className="bg-white text-black border-black mb-4 shadow-md">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{categoryName}</h1>
            <div className="w-16 h-1 bg-red-600 mt-2 rounded-full"></div>
          </div>

          <div className="mb-4">
            <PromoMessage />
          </div>

          {/* Menu de categorias horizontal com scroll */}
          <div className="mb-8 bg-black/50 backdrop-blur-sm sticky top-16 z-30 py-3 -mx-4 px-4 shadow-md">
            <CategoryMenu />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {items.map((item) => (
              <Card
                key={`${categoria}-${item.id}`}
                className="bg-black border border-white/10 overflow-hidden hover:border-white/30 transition-all cursor-pointer shadow-md"
                onClick={() => handleAddToCart(item)}
              >
                {categoria === "combos" ? (
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>
                ) : categoria === "mais-pedidos" ||
                  categoria === "pokes" ||
                  categoria === "burritos" ||
                  categoria === "shoyo-top" ||
                  categoria === "extras" ||
                  categoria === "bebidas" ||
                  categoria === "sushis" ||
                  categoria === "hot-rolls" ||
                  categoria === "yakisobas" ||
                  categoria === "temakis" ||
                  categoria === "bentos" ||
                  categoria === "sobremesas" ||
                  categoria === "vegetarianos" ||
                  categoria === "promocoes" ||
                  categoria === "boxes" ||
                  categoria === "kids" ||
                  categoria === "shoyo-balls" ||
                  categoria === "festivais" ? (
                  <div className="aspect-square relative bg-gradient-to-br from-red-800 to-red-600">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square relative bg-gradient-to-br from-red-800 to-red-600 flex items-center justify-center">
                    <div className="text-3xl font-bold text-white text-center p-4 z-10">{item.name}</div>
                  </div>
                )}
                {categoria !== "combos" && (
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                      <p className="text-xs text-red-500 mb-3 bg-red-500/10 px-3 py-1 rounded-full">
                        Frete grátis na primeira compra
                      </p>
                      <div className="font-bold text-red-600 text-xl mb-4">R$ {item.price.toFixed(2)}</div>
                    </div>
                    <Button
                      className="w-full bg-red-600 text-white hover:bg-red-700 py-2 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the parent onClick
                        handleAddToCart(item)
                      }}
                    >
                      COMPRAR
                    </Button>
                  </CardContent>
                )}
                {categoria === "combos" && (
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center mb-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                      <p className="text-xs text-red-500 mb-3 bg-red-500/10 px-3 py-1 rounded-full">
                        Frete grátis na primeira compra
                      </p>
                      <div className="font-bold text-red-600 text-xl mb-4">R$ {item.price.toFixed(2)}</div>
                    </div>
                    <Button
                      className="w-full bg-red-600 text-white hover:bg-red-700 py-2 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the parent onClick
                        handleAddToCart(item)
                      }}
                    >
                      COMPRAR
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
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

      {/* Diálogo de extras */}
      {selectedProduct && (
        <AddExtrasDialog
          isOpen={isExtrasDialogOpen}
          onClose={handleCloseExtrasDialog}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.image,
            category: categoria,
          }}
        />
      )}
    </div>
  )
}
