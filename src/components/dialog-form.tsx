/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { submitPlanForm } from "@/helpers/api";
import { planFormSchema, TPlanForms } from "@/helpers/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import sendIcon from "../assets/icons/send-mail.svg";
import { MaskedInput } from "./Form/MaskedInput";
import { Button } from "./ui/button";
import Select from "react-select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const estadosBrasileiros = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
];

export function DialogForm({ planId }: { planId: string; planName: string }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [load, setLoad] = useState<boolean>(false);
  const [citys, setCitys] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [loadCep, setLoadCep] = useState(false)

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<TPlanForms>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      nomeDenominacao: "",
      cpfCnpj: "",
      estimativaMembros: "",
      responsavelDenominacao: {
        nomeResponsavel: "",
        email: "",
        telefone: "",
      },
      enderecoDenominacao: {
        logradouro: "",
        complemento: "",
        bairro: "",
        cep: "",
        cidade: "",
        uf: "",
      }
    },
  });

  const {
    reset,
    watch,
    control,
    formState: { errors, isValid, isLoading },
    setValue,
    setError,
    clearErrors,
  } = form;

  const cpfCnpjMask =
    watch("cpfCnpj").length <= 11 ? "###.###.###-###" : "##.###.###/####-##";

  const maskCep = '#####-###'

  function closeModal() {
    setModalIsOpen(false);
    reset();
    clearErrors();
  }

  const uf = watch("enderecoDenominacao.uf")

  const estado = uf as unknown as { value: string, label: string }
  const cep = watch("enderecoDenominacao.cep")

  async function getCidades() {
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${estado.value}?providers=dados-abertos-br,gov,wikipedia`,
    );

    setCitys(data.map((city: any) => ({ label: city.nome, value: city.nome })));
  }

  async function getCep(h: string) {
    setLoadCep(true);
    try {
      if (h.length >= 7) {
        const { data } = await axios.get<{ state: string, city: string, cep: string, street: string, neighborhood: string }>(
          `https://brasilapi.com.br/api/cep/v1/${h}`,
        )
        setLoadCep(false);

        setValue('enderecoDenominacao.uf', { value: data.state, label: data.state });
        getCidades()

        if (citys.length > 0) {
          setValue('enderecoDenominacao.cidade', { value: data.city.toUpperCase(), label: data.city.toUpperCase() });
          setValue('enderecoDenominacao.logradouro', data.street)
          setValue('enderecoDenominacao.bairro', data.neighborhood)

        }

        setValue('enderecoDenominacao.cep', data.cep);
      }

    } catch (error) {
      setLoadCep(false)
    }
  }

  useEffect(() => {
    if (cep && cep?.length >= 8) {
      getCep(cep);
    }

  }, [cep]);


  useEffect(() => {
    if (estado) {
      getCidades();
    }
  }, [estado]);


  async function onSubmit(values: TPlanForms) {
    setLoad(true);
    const formattedValues = {
      ...values,
      estimativaMembros: Number.parseInt(
        values.estimativaMembros.toString(),
        10,
      ),
      planoDenominacaoId: planId,
      responsavelDenominacao: {
        ...values.responsavelDenominacao,
      },
      enderecoDenominacao: {
        ...values.enderecoDenominacao,
        cidade: values.enderecoDenominacao.cidade.value,
        uf: values.enderecoDenominacao.uf.value
      },
    };

    try {
      await submitPlanForm(formattedValues);
      reset();
      closeModal();
      toast({
        title: "Seu cadastro foi enviado com sucesso!",
      });
      setLoad(false);
      navigate("/obrigado", { replace: true });
    } catch (error) {
      console.error("Erro:", error);
      const consoleError = error as Error;
      setLoad(false);
      setModalErrorMessage(consoleError.message);
      setModalErrorOpen(true);
      setModalIsOpen(false);
    }
  }

  return (
    <>
      <Button
        className="w-full border border-cc-secondary bg-inherit font-bold text-cc-secondary hover:bg-cc-secondary hover:text-slate-50"
        onClick={() => setModalIsOpen(true)}
      >
        CONTRATAR PLANO
      </Button>
      <Modal
        isOpen={modalErrorOpen}
        onRequestClose={() => {
          setModalErrorOpen(false);
          setModalIsOpen(true);
        }}
        contentLabel="Cadastro de Denominação"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-sm"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="relative max-h-[95vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6">
          <h1 className="mb-5 text-center text-lg font-bold">Erro!</h1>
          <h3 className="text-md mb-5 text-center">{modalErrorMessage}</h3>
          <div className="flex justify-center">
            <Button
              className="mt-4 block"
              onClick={() => {
                setModalErrorOpen(false);
                setModalIsOpen(true);
              }}
              disabled={isLoading}
            >
              Voltar
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        contentLabel="Cadastro de Denominação"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-sm"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="relative max-h-[95vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6">
          <button
            onClick={() => closeModal()}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
          <h2 className="mb-4 text-xl font-bold">Cadastro de Denominação</h2>
          <p className="mb-4">
            Preencha os dados abaixo para cadastrar sua denominação.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nomeDenominacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Nome da Denominação
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Denominação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <MaskedInput
                  name="cpfCnpj"
                  label="CPF/CNPJ Denominação"
                  placeholder="CPF/CNPJ da Denominação"
                  mask={cpfCnpjMask}
                  control={control}
                  error={errors.cpfCnpj}
                />
              </FormItem>

              <FormField
                control={form.control}
                name="estimativaMembros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Número de Membros
                    </FormLabel>
                    <FormControl>
                      <Input
                        step={1}
                        type="number"
                        placeholder="Número de Membros"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsavelDenominacao.nomeResponsavel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Nome do Responsável
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Responsável" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MaskedInput
                name="responsavelDenominacao.telefone"
                label="Telefone do Responsável"
                placeholder="Telefone do Responsável"
                mask="(##) #####-####"
                control={control}
                error={errors.responsavelDenominacao?.telefone}
              />

              <FormField
                control={form.control}
                name="responsavelDenominacao.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Email do Responsável
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="h-10 border-b-2 mt-6" />
              <h3>Endereço da Denominação</h3>


              <FormItem>
                <MaskedInput
                  name="enderecoDenominacao.cep"
                  label="CEP"
                  placeholder="00000-000"
                  mask={maskCep}
                  control={control}
                  error={errors.enderecoDenominacao?.cep}
                />
              </FormItem>

              {loadCep ? (
                <p>Carregando...</p>
              ) : (
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="enderecoDenominacao.uf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">UF</FormLabel>
                        <FormControl>
                          <Select
                            isMulti={false}
                            options={estadosBrasileiros as any[]}
                            blurInputOnSelect={false}
                            {...field}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                minHeight: 40,
                                borderRadius: 7,
                                background: "rgb(250, 260, 252)",
                                // borderColor: state.isFocused ? '#c01010' : '#dee3e3',
                              }),
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enderecoDenominacao.cidade"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-bold">Cidade</FormLabel>
                        <FormControl>
                          <Select
                            isMulti={false}
                            options={citys as any[]}
                            blurInputOnSelect={false}
                            {...field}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                minHeight: 40,
                                borderRadius: 7,
                                background: "rgb(250, 260, 252)",
                                borderColor: "#a3a3a3",
                              }),
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              )}


              <FormField
                control={form.control}
                name="enderecoDenominacao.logradouro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Logradouro
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Logradouro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="enderecoDenominacao.bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Logradouro
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Logradouro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="enderecoDenominacao.complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Complemento (optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex gap-2">
                <Button
                  type="button"
                  className="mt-4 flex-1 items-center"
                  onClick={() => closeModal()}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  className="mt-4 flex-1 items-center"
                  disabled={isLoading || !isValid}
                >
                  <img
                    src={sendIcon}
                    alt="ícone de envio de mensagem"
                    className="mr-2"
                  />
                  {isLoading || load ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
}
