import { DialogForm } from "../dialog-form";
import { ModulesContainer, PlansContainer, TopPlan } from "./styles";
import Check from "../../assets/icons/green-check.svg";

type TModules = {
  moduloId: string;
  titulo: string;
};

interface IPlanCard {
  title: string;
  titleAux: number;
  id: string;
  valor: string;
  informacao: string;
  modulos: TModules[];
}

export const PlanCardNew: React.FC<IPlanCard> = ({
  title,
  titleAux,
  id,
  informacao,
  modulos,
  valor,
}) => {
  return (
    <PlansContainer key={id}>
      <TopPlan>
        <h1 className="plan-name text-center text-2xl font-bold text-slate-700">
          Plano: {titleAux + 1}
        </h1>
        <div className="price-container">
          <span className="label text-md text-center font-normal text-slate-700">
            R$
          </span>
          <span className="price text-center text-4xl font-bold text-slate-700">
            {valor}
          </span>
          <span className="label text-md text-center font-normal text-slate-700">
            /mês
          </span>
        </div>
        <div className="qtd-detail">
          <p className="text-md text-center font-normal text-slate-700">
            Para Igrejas {informacao.charAt(0).toLocaleLowerCase()}
            {informacao.slice(1)}
          </p>
        </div>
      </TopPlan>
      <DialogForm planId={id} planName={title} />
      <ModulesContainer>
        <p className="decription text-md font-bold text-slate-800">
          Benefícios
        </p>
        <ul className="block max-h-72 overflow-y-scroll md:max-h-none md:overflow-auto">
          {modulos.map((modulo) => (
            <li
              key={modulo.moduloId}
              className="flex gap-2 text-sm sm:text-base"
            >
              <img src={Check} alt="Ícone de verificação" />
              {modulo.titulo}
            </li>
          ))}
        </ul>
      </ModulesContainer>
    </PlansContainer>
  );
};
