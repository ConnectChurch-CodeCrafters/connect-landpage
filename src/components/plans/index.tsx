import { useEffect, useState } from "react";

import { Plan } from "@/types/types";
import { getPlans } from "@/helpers/api";
import { PlanCard } from "./plan-card";

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
            <h2 className="text-center text-base font-extrabold text-slate-700 md:text-xl">
              Pronto para começar?
            </h2>
            <p className="text-center">
              Explore as funcionalidades e encontre a opção perfeita para sua
              comunidade
            </p>
            <p className="mt-2 text-center text-sm">
              <span className="font-bold">
              Comece gratuitamente:
              </span>{" "}
              Não perca essa oportunidade!
            </p>
          </div>
          <div className="flex-wrap justify-center gap-4 md:flex">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />              
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
