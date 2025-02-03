import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Agenda from "../assets/cc-agenda.webp";
import Leitura from "../assets/cc-leitura.webp";
import Eventos from "../assets/cc-eventos.webp";
import { FunctionalitiesData } from "@/types/types";
import { getFunctionalities } from "@/helpers/api";
import { AppBtn } from "./app-btn";
import { FunctionalitiesCarousel } from "./functionalities-carousel";

export function Functionalities() {
  const [isOthersBtnClicked, setIsOthersBtnClicked] = useState(false);
  const [functionalities, setFunctionalities] =
    useState<FunctionalitiesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      setLoading(true);
      setFunctionalities(null);
      const data = await getFunctionalities();
      if (!ignore) {
        setFunctionalities(data);
        setLoading(false);
      }
    }

    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  function handleOthersBtnClick() {
    setIsOthersBtnClicked(true);
  }

  function handleObjectivesBtnClick() {
    setIsOthersBtnClicked(false);
  }

  const BtnSelectedClasses = "font-bold bg-white hover:bg-white shadow-sm";
  const BtnNotSelectedClasses = "bg-cc-card-bg hover:bg-cc-card-bg";

  const imagesToCards: { [key: string]: string } = {
    "Divulgação de Profissionais da Igreja": Agenda,
    "Bíblia Integrada": Leitura,
    "Agenda de Eventos": Eventos,
  };

  function FunctionalityCard({
    title,
    description,
    imagesToCards,
    functionImage,
  }: {
    title: string;
    description: string;
    imagesToCards: { [key: string]: string };
    functionImage?: string;
  }) {
    const imageSrc = functionImage || (imagesToCards[title] || "");

    return (
      <div className="p-4">
        <div className="flex h-full flex-col bg-white p-4">
          <img
            src={imageSrc}
            alt="thumbnail da funcionalidade"
            className="h-auto w-full rounded-t-2xl"
          />
          <h2 className="mt-4 text-lg font-bold text-slate-700">{title}</h2>
          <p className="mt-2 flex-grow text-sm">{description}</p>
        </div>
      </div>
    );
  }

  const mainFunctionalitiesCards = functionalities?.modulosPrincipais.map(
    (functionality) => (
      <FunctionalityCard
        key={functionality.id}
        title={functionality.titulo}
        description={functionality.descricao}
        imagesToCards={imagesToCards}
        functionImage={functionality.urlIcone}
      />
    ),
  );

  const otherFunctionalitiesCards = functionalities?.outrasFuncionalidades.map(
    (functionality) => (
      <FunctionalityCard
        key={functionality.id}
        title={functionality.titulo}
        description={functionality.descricao}
        imagesToCards={imagesToCards}
        functionImage={functionality.urlIcone}
      />
    ),
  );

  return (
    <section id="funcionalidades">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 sm:gap-8">
          <div
            className="flex w-min flex-col items-center justify-center rounded-3xl bg-cc-card-bg p-2 sm:flex-row sm:rounded-full"
            id="functionalities-btn"
          >
            <Button
              className={`rounded-full bg-white px-8 py-6 text-slate-950 hover:bg-white ${isOthersBtnClicked ? BtnNotSelectedClasses : BtnSelectedClasses}`}
              onClick={handleObjectivesBtnClick}
            >
              Objetivos do APP
            </Button>
            <Button
              className={`rounded-full bg-cc-card-bg px-8 py-6 text-slate-950 hover:bg-cc-card-bg ${isOthersBtnClicked ? BtnSelectedClasses : BtnNotSelectedClasses}`}
              onClick={handleOthersBtnClick}
            >
              Outras Funcionalidades
            </Button>
          </div>

          {/* deve sumir em telas menores */}
          <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {functionalities && !isOthersBtnClicked
              ? mainFunctionalitiesCards
              : otherFunctionalitiesCards}
          </div>

          {/* deve aparecer em telas menores */}
          <div className="block sm:hidden w-full">
            {loading ? (
              <div className="text-center">Carregando...</div>
            ) : (
              <FunctionalitiesCarousel
                functionalities={functionalities}
                isOthersBtnClicked={isOthersBtnClicked}
                imagesToCards={imagesToCards}
              />
            )}
          </div>

          <AppBtn />
        </div>
      </div>
    </section>
  );
}