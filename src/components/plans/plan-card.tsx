import { formatPrice } from "@/helpers/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Plan } from "@/types/types";
import { cn } from "@/lib/utils";

import { DialogForm } from "../dialog-form";

import Check from "../../assets/icons/green-check.svg";
import { Button } from "../ui/button";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Card className="mb-4 self-start rounded-2xl bg-cc-card-bg-2 shadow-md hover:border-cc-secondary md:mb-0">
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
          Para Igrejas {plan.informacao.charAt(0).toLocaleLowerCase()}
          {plan.informacao.slice(1)}
        </p>

        <DialogForm planId={plan.id} planName={plan.titulo} />

        <p className="font-bold">Benefícios</p>
        <div className="relative before:absolute before:-right-2 before:-top-6 before:text-cc-secondary before:content-['▲'] after:absolute after:-bottom-6 after:-right-2 after:text-cc-secondary after:content-['▼'] md:before:content-[''] md:after:content-['']">
          <ul
            className={cn("block h-72 overflow-hidden transition-all", {
              "h-fit": isExpanded,
            })}
          >
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

          <Button
            className="mt-4 w-full bg-cc-secondary hover:bg-cc-secondary/70"
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            {isExpanded ? "Mostrar menos" : "Mais Benefícios"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
