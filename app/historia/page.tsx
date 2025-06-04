import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HistoriaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre a Shoyo Shoyo</h1>
              <p className="mt-4 text-gray-400">Nossa história e valores</p>
            </div>

            <div className="space-y-6">
              <section className="space-y-3">
                <p className="text-gray-300">
                  Fundada em 2024, a Shoyo Shoyo nasceu com um propósito simples e ousado: transformar o sabor do
                  cotidiano em uma experiência inesquecível. Em um mundo onde a pressa dita o ritmo e os sabores se
                  perdem na rotina, a Shoyo Shoyo veio para resgatar o prazer de saborear o que é autêntico.
                </p>
              </section>

              <section className="space-y-3">
                <p className="text-gray-300">
                  Mais do que uma marca, somos uma celebração da cultura, da criatividade e da alma dos temperos
                  orientais — com um toque brasileiro. Nosso nome é um convite à repetição do que é bom, ao segundo
                  gole, à segunda colherada, ao "quero mais" de quem prova algo verdadeiramente marcante.
                </p>
              </section>

              <section className="space-y-3">
                <p className="text-gray-300">
                  Na Shoyo Shoyo, cada produto é desenvolvido com foco em qualidade, equilíbrio e inovação. Selecionamos
                  ingredientes com rigor, combinando tradição e tecnologia para oferecer produtos que respeitam a
                  essência do sabor original, mas que surpreendem pelo frescor e autenticidade.
                </p>
              </section>

              <section className="space-y-3">
                <p className="text-gray-300">
                  Seja no molho shoyu clássico, em versões especiais com especiarias, ou nos acompanhamentos exclusivos
                  da nossa linha gourmet, nosso compromisso é entregar excelência — da embalagem ao último pingo.
                </p>
              </section>

              <section className="space-y-3">
                <p className="text-gray-300">
                  Nosso diferencial vai além do paladar: investimos em processos sustentáveis, design minimalista,
                  comunicação direta e atendimento humanizado. A Shoyo Shoyo é feita por pessoas apaixonadas por sabor e
                  movidas por propósito.
                </p>
              </section>

              <section className="space-y-3">
                <p className="text-gray-300 font-semibold text-center italic">
                  Shoyo Shoyo. Quando o sabor é tão bom que você quer repetir.
                </p>
              </section>
            </div>

            <div className="flex justify-center pt-6">
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/">Voltar para a Página Inicial</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
