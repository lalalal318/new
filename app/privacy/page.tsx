import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Política de Privacidade</h1>
              <p className="mt-4 text-gray-400">Última atualização: 08 de Maio de 2024</p>
            </div>

            <div className="space-y-6">
              <section className="space-y-3">
                <h2 className="text-2xl font-bold">1. Introdução</h2>
                <p className="text-gray-300">
                  O Shoyo Shoyo valoriza a privacidade de nossos clientes e visitantes. Esta Política de Privacidade
                  descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você
                  utiliza nosso site e serviços.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">2. Informações que Coletamos</h2>
                <p className="text-gray-300">Podemos coletar os seguintes tipos de informações:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>
                    <strong>Informações de identificação pessoal:</strong> Nome, endereço, número de telefone, endereço
                    de e-mail e informações de pagamento quando você faz um pedido.
                  </li>
                  <li>
                    <strong>Informações de uso:</strong> Dados sobre como você interage com nosso site, incluindo
                    páginas visitadas, tempo gasto no site e preferências de navegação.
                  </li>
                  <li>
                    <strong>Informações do dispositivo:</strong> Tipo de dispositivo, sistema operacional, tipo de
                    navegador e endereço IP.
                  </li>
                  <li>
                    <strong>Informações de localização:</strong> Para facilitar a entrega de pedidos e determinar áreas
                    de serviço.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">3. Como Usamos Suas Informações</h2>
                <p className="text-gray-300">Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Gerenciar sua conta e fornecer suporte ao cliente</li>
                  <li>Personalizar sua experiência e oferecer promoções relevantes</li>
                  <li>Melhorar nosso site e serviços</li>
                  <li>Enviar comunicações de marketing (com seu consentimento)</li>
                  <li>Cumprir obrigações legais e proteger nossos direitos</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">4. Compartilhamento de Informações</h2>
                <p className="text-gray-300">Podemos compartilhar suas informações com:</p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>
                    <strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar nosso site, processar
                    pagamentos e entregar pedidos.
                  </li>
                  <li>
                    <strong>Parceiros de negócios:</strong> Para oferecer produtos ou serviços conjuntos.
                  </li>
                  <li>
                    <strong>Autoridades legais:</strong> Quando exigido por lei ou para proteger nossos direitos legais.
                  </li>
                </ul>
                <p className="text-gray-300">
                  Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">5. Cookies e Tecnologias Semelhantes</h2>
                <p className="text-gray-300">
                  Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego do site
                  e personalizar o conteúdo. Você pode controlar o uso de cookies através das configurações do seu
                  navegador.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">6. Segurança de Dados</h2>
                <p className="text-gray-300">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra
                  acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão
                  pela Internet ou armazenamento eletrônico é 100% seguro.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">7. Seus Direitos</h2>
                <p className="text-gray-300">
                  Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas informações
                  pessoais:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Acessar e receber uma cópia de suas informações</li>
                  <li>Corrigir informações imprecisas</li>
                  <li>Solicitar a exclusão de suas informações</li>
                  <li>Restringir ou opor-se ao processamento de suas informações</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                </ul>
                <p className="text-gray-300">
                  Para exercer esses direitos, entre em contato conosco através dos canais indicados abaixo.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">8. Retenção de Dados</h2>
                <p className="text-gray-300">
                  Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta
                  Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por
                  lei.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">9. Alterações nesta Política</h2>
                <p className="text-gray-300">
                  Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
                  disponível em nosso site, com a data da última atualização. Recomendamos que você revise esta política
                  regularmente.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">10. Contato</h2>
                <p className="text-gray-300">
                  Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos suas
                  informações pessoais, entre em contato conosco:
                </p>
                <p className="text-gray-300">
                  <strong>Email:</strong> privacidade@shoyoshoyo.com.br
                  <br />
                  <strong>Telefone:</strong> (11) 99999-9999
                  <br />
                  <strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP
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
