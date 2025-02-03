export type Module = {
  id: string;
  titulo: string;
  urlIcone: string;
  descricao: string;
  urlVideo: string;
};

export type FunctionalitiesData = {
  modulosPrincipais: Module[];
  outrasFuncionalidades: Module[];
  erros: [];
  isValid: boolean;
};

export type ModulesData = {
  result: Member[];
  erros: string[];
  isValid: boolean;
};

export type Member = {
  id: string;
  titulo: string;
  urlIcone: string;
  descricao: string;
  urlVideo: string;
  ordem: number | null;
};

export type PlansData = {
  result: Plan[];
  erros: string[];
  isValid: boolean;
};

export type Plan = {
  id: string;
  titulo: string;
  informacao: string;
  valor: number;
  modulos: {
    moduloId: string;
    titulo: string;
  }[];
};

export type FormattedValuesContact = {
  nome: string;
  telefone: string;
  email: string;
};

export type FormattedValuesEmbaixador = {
  nome: string;
  celular: string;
  email: string;
};

export type FormattedValuesPlan = {
  nomeDenominacao: string;
  cpfCnpj: string;
  estimativaMembros: number;
  planoDenominacaoId: string;
  responsavelDenominacao: {
    nomeResponsavel: string;
    email: string;
    telefone: string;
  };
};
