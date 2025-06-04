import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComboSectionProps {
  title: string
  description: string
  price: string
  image: string
  freeDelivery?: boolean
}

export default function ComboSection({ title, description, price, image, freeDelivery }: ComboSectionProps) {
  return (
    <Card className="bg-black border border-white/10 overflow-hidden hover:border-white/30 transition-all">
      <div className="aspect-video relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
            <div className="font-bold text-xl">{price}</div>
          </div>
          {freeDelivery && (
            <Badge variant="outline" className="border-red-600 text-white bg-red-600/10">
              FRETE GRÁTIS
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
