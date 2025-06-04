import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Termos de Uso</h1>
              <p className="mt-4 text-gray-400">Última atualização: 08 de Maio de 2024</p>
            </div>

            <div className="space-y-6">
              <section className="space-y-3">
                <h2 className="text-2xl font-bold">1. Aceitação dos Termos</h2>
                <p className="text-gray-300">
                  Ao acessar e utilizar o site e os serviços do Shoyo Shoyo, você concorda em cumprir e estar vinculado
                  a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, solicitamos que não
                  utilize nosso site ou serviços.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">2. Descrição dos Serviços</h2>
                <p className="text-gray-300">
                  O Shoyo Shoyo oferece um site informativo sobre nosso restaurante, cardápio e serviços de delivery de
                  comida japonesa. Nosso site permite que os usuários visualizem nosso cardápio, façam pedidos online e
                  entrem em contato conosco.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">3. Conta de Usuário</h2>
                <p className="text-gray-300">
                  Para realizar pedidos através do nosso site, pode ser necessário criar uma conta. Você é responsável
                  por manter a confidencialidade de suas informações de login e por todas as atividades que ocorrem em
                  sua conta. Você concorda em notificar imediatamente o Shoyo Shoyo sobre qualquer uso não autorizado de
                  sua conta.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">4. Pedidos e Pagamentos</h2>
                <p className="text-gray-300">
                  Ao fazer um pedido através do nosso site, você concorda em fornecer informações de pagamento precisas
                  e completas. O Shoyo Shoyo reserva-se o direito de recusar ou cancelar qualquer pedido por qualquer
                  motivo, incluindo erro nos preços ou disponibilidade dos produtos.
                </p>
                <p className="text-gray-300">
                  Os preços exibidos no site estão sujeitos a alterações sem aviso prévio. Promoções e descontos podem
                  estar sujeitos a condições específicas e prazos de validade.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">5. Entrega</h2>
                <p className="text-gray-300">
                  O Shoyo Shoyo se esforça para entregar os pedidos dentro do prazo estimado, mas não podemos garantir
                  horários exatos de entrega devido a fatores externos como condições de trânsito e clima. Taxas de
                  entrega podem ser aplicadas com base na localização.
                </p>
                <p className="text-gray-300">
                  A promoção de "Frete grátis na primeira compra" está sujeita a um valor mínimo de pedido e área de
                  entrega específica.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">6. Propriedade Intelectual</h2>
                <p className="text-gray-300">
                  Todo o conteúdo presente no site do Shoyo Shoyo, incluindo textos, gráficos, logotipos, ícones,
                  imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade do Shoyo Shoyo ou
                  de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">7. Limitação de Responsabilidade</h2>
                <p className="text-gray-300">
                  O Shoyo Shoyo não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais
                  ou punitivos resultantes do uso ou incapacidade de usar nossos serviços, ou por qualquer informação,
                  produtos ou serviços obtidos através do nosso site.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">8. Alterações nos Termos</h2>
                <p className="text-gray-300">
                  O Shoyo Shoyo reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações
                  entrarão em vigor imediatamente após a publicação no site. O uso contínuo do site após tais
                  modificações constitui sua aceitação dos Termos de Uso revisados.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">9. Lei Aplicável</h2>
                <p className="text-gray-300">
                  Estes Termos de Uso são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa
                  decorrente ou relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais de São
                  Paulo.
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
