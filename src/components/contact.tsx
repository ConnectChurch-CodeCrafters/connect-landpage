import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import sendIcon from "../assets/icons/send-mail.svg";
import AppCard from "./app-card";

import GooglePay from "../assets/google-pay.webp";
import AppleStore from "../assets/apple-store.webp";
import { formatPhoneNumber } from "@/helpers/helpers";
import { contactFormSchema } from "@/helpers/schemas";
import { submitContactForm } from "@/helpers/api";
import { useToast } from "./ui/use-toast";
import { FormattedValuesContact } from "@/types/types";

export function ContactForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const formattedValues: FormattedValuesContact = {
      ...values,
      telefone: formatPhoneNumber(values.telefone),
    };

    try {
      await submitContactForm(formattedValues);
      reset();

      toast({
        title: "Seu contato foi enviado com sucesso!",
      });
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2 md:flex-row"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Email" {...field} className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
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

export function Contact() {
  return (
    <section id="contato">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-4">
          <h2 className="text-xl font-extrabold text-slate-700">
            FALE CONOSCO
          </h2>
          <div
            className="flex items-center justify-center gap-4 rounded-3xl bg-cc-card-bg p-10"
            id="contato__card"
          >
            <ContactForm />
          </div>
        </div>       

        <div className="flex flex-col items-center justify-center gap-2 py-16">
          <h2 className="text-center text-xl font-extrabold text-slate-700">
            BAIXE JÁ
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <AppCard
              description="Baixar na"
              app="Google Play"
              imgLink={GooglePay}
              href="https://play.google.com/store/apps/details?id=appc.connect.appcom"
            />
            <AppCard
              description="Baixar na"
              app="Apple Store"
              imgLink={AppleStore}
              href="https://apps.apple.com/br/app/connectchurchs/id6479539575"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


