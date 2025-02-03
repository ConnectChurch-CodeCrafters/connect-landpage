import { useEffect, useState } from "react";
import Agenda from "../assets/cc-agenda.webp";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FunctionalitiesData } from "@/types/types";

function FunctionalityCardMobile({
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
  const imageSrc = functionImage || (imagesToCards[title] || Agenda);

  return (
    <CarouselItem className="p-4">
      <div className="flex h-full flex-col bg-white p-4">
        <img
          src={imageSrc}
          alt="thumbnail da funcionalidade"
          className="h-auto w-full rounded-t-2xl"
        />
        <h2 className="mt-4 text-lg font-bold text-slate-700">{title}</h2>
        <p className="mt-2 flex-grow text-sm">{description}</p>
      </div>
    </CarouselItem>
  );
}

export function FunctionalitiesCarousel({
  functionalities,
  isOthersBtnClicked,
  imagesToCards,
}: {
  functionalities: FunctionalitiesData | null;
  isOthersBtnClicked: boolean;
  imagesToCards: { [key: string]: string };
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  const mainFunctionalitiesCardsMobile = functionalities?.modulosPrincipais.map(
    (functionality) => (
      <FunctionalityCardMobile
        key={functionality.id}
        title={functionality.titulo}
        description={functionality.descricao}
        imagesToCards={imagesToCards}
      />
    ),
  );

  const otherFunctionalitiesCardsMobile =
    functionalities?.outrasFuncionalidades.map((functionality) => (
      <FunctionalityCardMobile
        key={functionality.id}
        title={functionality.titulo}
        description={functionality.descricao}
        imagesToCards={imagesToCards}
        functionImage={functionality.urlIcone}
      />
    ));

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
        className="mx-auto md:w-[60%] w-10/12"
      >
        <CarouselContent>
          {isOthersBtnClicked
            ? otherFunctionalitiesCardsMobile
            : mainFunctionalitiesCardsMobile}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-7%] top-1/2" />
        <CarouselNext className="absolute left-[91%] top-1/2" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Imagem {current} de {count}
      </div>
    </>
  );
}