import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";

// import Check from "../assets/icons/green-check.svg";
// import { DialogForm } from "./dialog-form";
import { Plan } from "@/types/types";
import { formatPrice } from "@/helpers/helpers";
import { getPlans } from "@/helpers/api";
import { PlanCardNew } from "./plans-cards";
import { isMobile } from "@/helpers/is-mobile";

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function startFetching() {
      setPlans([]);
      const data = await getPlans();
      if (!ignore) {
        setPlans(data.result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="planos">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:p-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <p className="mt-2 text-center text-sm">
              <span className="font-bold">
              Comece gratuitamente:
              </span>{" "}
              Não perca essa oportunidade!
            </p>
          </div>
          {isMobile() ? (
            <div className="flex flex-[3] flex-col gap-[1vw]">
              {plans.map((plan, index) => (
                <>
                  <PlanCardNew
                    id={plan.id}
                    title={plan.titulo}
                    informacao={plan.informacao}
                    modulos={plan.modulos}
                    titleAux={index}
                    valor={formatPrice(plan.valor)}
                  />
                </>
              ))}
            </div>
          ) : (
            <div className="flex flex-[3] flex-row gap-[1vw]">
              {plans.map((plan, index) => (
                <>
                  <PlanCardNew
                    id={plan.id}
                    title={plan.titulo}
                    informacao={plan.informacao}
                    modulos={plan.modulos}
                    titleAux={index}
                    valor={formatPrice(plan.valor)}
                  />
                </>
              ))}
            </div>
          )}
          {/* <div className="flex-wrap justify-center gap-4 md:flex">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="mb-4 rounded-2xl bg-cc-card-bg-2 shadow-md hover:border-cc-secondary md:mb-0"
              >
                <CardHeader>                
                  <CardDescription className="font-bold text-slate-600">
                    {plan.titulo.toUpperCase()}
                  </CardDescription>
                  <CardTitle className="text-5xl font-bold">
                    {formatPrice(plan.valor)}{" "}
                    <span className="text-2xl font-normal text-gray-400 line-through">
                      {plan.titulo === "Básico" && "69,90"}
                      {plan.titulo === "Intermediário" && "150,90"}
                      {plan.titulo === "Avançado" && "390,60"}
                    </span>
                    <p className="text-base font-normal">/por mês</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <p>
                    Para Igrejas{" "}
                    {plan.informacao.charAt(0).toLocaleLowerCase()}
                    {plan.informacao.slice(1)}
                  </p>

                  <DialogForm planId={plan.id} planName={plan.titulo} />

                  <p className="font-bold">Benefícios</p>
                  <div className="relative before:absolute before:-right-2 before:-top-6 before:text-cc-secondary before:content-['▲'] after:absolute after:-bottom-6 after:-right-2 after:text-cc-secondary after:content-['▼'] md:before:content-[''] md:after:content-['']">
                    <ul className="block max-h-72 overflow-y-scroll md:max-h-none md:overflow-auto">
                      {plan.modulos.map((modulo) => (
                        <li
                          key={modulo.moduloId}
                          className="flex gap-2 text-sm sm:text-base"
                        >
                          <img src={Check} alt="Ícone de verificação" />
                          {modulo.titulo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>   */}
        </div>
      </div>
    </section>
  );
}
