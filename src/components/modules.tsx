import { useEffect, useState } from "react";
import { CarouselApi } from "./ui/carousel";

import { Member } from "@/types/types";
import { getModules } from "@/helpers/api";
import { ModulesCards } from "./modules-cadrs";
import { isMobile } from "@/helpers/is-mobile";

export function Modules() {
  const [modules, setModules] = useState<Member[]>([]);
  const [api] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    if (!loading) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }
  }, [api, loading]);

  useEffect(() => {
    async function startFetching() {
      setLoading(true);
      setModules([]);
      const data = await getModules();
      if (!ignore) {
        setModules(data.result);
        setLoading(false);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="modulos">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-8 sm:py-4">
          <h2 className="text-center text-base font-extrabold text-slate-700 md:text-left md:text-xl">
            NOSSOS MÓDULOS
          </h2>

          {loading ? (
            <div className="text-center">Carregando...</div>
          ) : (
            <>
              {isMobile() ? (
                <div className="flex w-full flex-col items-center justify-center gap-y-4 overflow-y-scroll">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform sm:max-w-sm"
                    >
                      <ModulesCards
                        title={module.titulo}
                        description={truncateText(module.descricao, 50)} // Limite maior de texto
                        iconUrl={module.urlIcone}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                    >
                      <ModulesCards
                        title={module.titulo}
                        description={truncateText(module.descricao, 50)} // Limite maior de texto
                        iconUrl={module.urlIcone}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// Função para truncar texto
function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
