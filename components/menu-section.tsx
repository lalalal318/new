import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

interface MenuSectionProps {
  title: string
  items: MenuItem[]
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold tracking-tighter pb-2 border-b border-white/10">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className="bg-black border border-white/10 overflow-hidden hover:border-white/30 transition-all"
          >
            <div className="aspect-square relative">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.description}
                  </p>
                </div>
                <div className="font-bold">{item.price}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
