import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sendIcon from "../assets/icons/send-mail.svg";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { submitEmbaixadorForm } from "@/helpers/api";
import { formatPhoneNumber } from "@/helpers/helpers";
import { embaixadorFormSchema } from "@/helpers/schemas";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { FormattedValuesEmbaixador } from "@/types/types";

export function EmbaixadorForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(embaixadorFormSchema),
    defaultValues: {
      nome: "",
      celular: "",
      email: "",
      instagram: "",
      cidade: "",
      estado: "",
      idade: "",
    },
  });

  const { reset, setValue, watch } = form;

  async function onSubmit(values: z.infer<typeof embaixadorFormSchema>) {
    const formattedValues: FormattedValuesEmbaixador = {
      ...values,
      celular: formatPhoneNumber(values.celular),
    };

    try {
      await submitEmbaixadorForm(formattedValues);

      toast({
        title: "Seu contato foi enviado com sucesso!",
      });

      reset();

      alert('Seu contato foi enviado com sucesso!')
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const cell = watch('celular')

  useEffect(() => {
    console.log(cell)
    if (cell.length > 6) {
      setValue('celular', cell.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'))
    }
  }, [cell])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-wrap gap-4"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className="w-full md:w-[290px]">
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="celular"
          render={({ field }) => (
            <FormItem className="w-full md:w-[230px]">
              <FormControl>
                <Input maxLength={14} placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Link Instagram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem className="w-full md:w-[340px]">
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/5">
              <FormControl>
                <Input maxLength={2} placeholder="Estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/5">
              <FormControl>
                <Input type="number" placeholder="Idade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full self-center md:w-full">
          <img
            src={sendIcon}
            alt="ícone de envio de mensagem"
            className="mr-2"
          />
          Enviar Mensagem
        </Button>
      </form>
    </Form>
  );
}

export function ContactParceiro() {
  return (
    <section id="contato">
      <div className="mx-auto mt-[-50px] md:mt-1  max-w-screen-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex  flex-col gap-2 py-4">
          <h2 className="text-xl font-extrabold text-slate-700">
            SEJA NOSSO PARCEIRO
          </h2>
          <div
            className="flex items-center  justify-center gap-4 rounded-3xl bg-cc-card-bg p-10"
            id="contato__card"
          >
            <EmbaixadorForm />
          </div>
        </div>
      </div>
    </section>
  );
}
