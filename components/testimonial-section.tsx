import { Star } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section id="depoimentos" className="py-12 md:py-16 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">DEPOIMENTOS</h2>
          <p className="max-w-[700px] text-gray-300 md:text-xl">O que nossos clientes dizem sobre nós</p>
        </div>
        <div className="mx-auto grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mb-4 italic">
              "Os melhores sushis que já comi! Ingredientes frescos e apresentação impecável. Recomendo o combo família,
              vale muito a pena!"
            </p>
            <div>
              <p className="font-bold">Ana Silva</p>
              <p className="text-sm text-gray-400">Cliente desde 2022</p>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mb-4 italic">
              "Ambiente aconchegante e atendimento excepcional. Os hot rolls são simplesmente divinos. Já virou meu
              restaurante japonês favorito!"
            </p>
            <div>
              <p className="font-bold">Carlos Oliveira</p>
              <p className="text-sm text-gray-400">Cliente desde 2021</p>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black p-6 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mb-4 italic">
              "Pedi delivery e fiquei impressionada com a rapidez e a qualidade. Os sushis chegaram perfeitos e muito
              saborosos. Super recomendo!"
            </p>
            <div>
              <p className="font-bold">Mariana Santos</p>
              <p className="text-sm text-gray-400">Cliente desde 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
