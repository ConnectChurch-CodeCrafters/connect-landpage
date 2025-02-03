import AboutUsImg from "../assets/cc-about-us.webp";
import { AppBtn } from "./app-btn";

export function AboutUs() {
  const AboutUsDescriptionPs = [
    "Na Connect Church's, reconhecemos o impacto crescente da tecnologia em nossas vidas diárias e vemos isso como uma oportunidade emocionante para fortalecer os laços espirituais e comunitários dentro das igrejas.",
    "com a integração inovadora da tecnologia e da palavra, facilitamos uma conexão mais profunda entre os membros, tornando o acesso à palavra mais envolvente e acessível, literalmente na palma das mãos. Incentivamos o estudo profundo das escrituras e promovemos a interação entre os fiéis, independentemente de onde estejam.",
    "Acreditamos firmemente que este é um momento crucial. A tecnologia pode ser uma ferramenta poderosa para fortalecer a fé e nutrir conexões significativas. Na Connect Church's, estamos comprometidos em explorar todas as possibilidades que a tecnologia oferece para nos aproximarmos da palavra de Deus.",
    "Seja bem-vindo à Connect Church's, onde a tecnologia e a espiritualidade se unem para criar uma experiência enriquecedora e transformadora.",
  ];

  return (
    <section id="sobre-nos">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-4">
          <h2 className="text-base font-extrabold text-slate-700 md:text-xl">
            SOBRE NÓS
          </h2>
          <div
            className="flex flex-col items-center gap-4 rounded-3xl bg-cc-card-bg p-10 sm:gap-12 md:justify-center lg:flex-row lg:p-20"
            id="sobre-nos__card"
          >
            <div className="flex-2 flex flex-col items-start gap-2">
              <h1 className="text-3xl font-bold md:text-4xl">
                Connect Church's
              </h1>
              {AboutUsDescriptionPs.map((paragraph, index) => (
                <p className="text-sm md:text-base" key={index}>
                  {paragraph}
                </p>
              ))}
              <AppBtn />
            </div>
            <img
              className="max-w-[80%] lg:max-w-full"
              src={AboutUsImg}
              alt="Imagem de pessoas sorrindo com o logo da Connect Church's"
              width={405} height={470}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
