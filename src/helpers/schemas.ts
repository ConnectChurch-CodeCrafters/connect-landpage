import { z } from "zod";

const contactPhoneRegex = /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/;

export const contactFormSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Nome precisa de pelo menos 2 caracteres" })
    .max(50, { message: "Nome só pode no máximo 50 caracteres" }),
  telefone: z
    .string()
    .regex(contactPhoneRegex, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }),
});


const labelForm = z.object({
  label: z.string(),
  value: z.string()
})


export const embaixadorFormSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Nome precisa de pelo menos 2 caracteres" })
    .max(50, { message: "Nome só pode no máximo 50 caracteres" }),
  celular: z
    .string()
    .min(11),
  email: z.string().email({ message: "Email inválido" }),
  instagram: z.string().min(2, { message: "Nome precisa de pelo menos 2 caracteres" }),
  cidade: z.string().min(2, { message: "Nome precisa de pelo menos 2 caracteres" }),
  estado: z.string().min(2, { message: "Nome precisa de pelo menos 2 caracteres" }),
  idade: z.string().min(2, { message: "Nome precisa de pelo menos 2 caracteres" }),
});

export const planPhoneRegex = /^\d{11}$/;
export const membersRegex = /^[1-9]\d*$/;

export const planFormSchema = z.object({
  nomeDenominacao: z
    .string()
    .min(2, { message: "Nome precisa de pelo menos 2 caracteres" })
    .max(50, { message: "Nome só pode no máximo 50 caracteres" }),
  cpfCnpj: z.union([
    z.string().length(11, "CPF/CNPJ inválido"),
    z.string().length(14, "CPF/CNPJ inválido"),
  ]),
  estimativaMembros: z.string().regex(membersRegex, {
    message: "Estimativa de membros precisa ser pelo menos 1",
  }),
  responsavelDenominacao: z.object({
    nomeResponsavel: z.string().min(2, {
      message: "Nome do responsável precisa de pelo menos 2 caracteres",
    }),
    email: z.string().email({ message: "Email inválido" }),
    telefone: z
      .string()
      .regex(planPhoneRegex, { message: "Telefone inválido" }),
  }),
  enderecoDenominacao: z.object({
    logradouro: z.string(),
    cep: z.string().min(8, 'cep inválido').transform(h => h.replace('-', '')),
    cidade: labelForm,
    bairro: z.string().min(2, 'Birro precisa ser informado'),
    uf: labelForm,
    complemento: z.string().optional().nullable()
  })
});
