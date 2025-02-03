import { useClipboard } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import Logo from "../assets/cc-logo.svg";
import CurvedBG from "/curved-bg.svg";
import { Button } from "@/components/ui/button";

const groupLink = "https://chat.whatsapp.com/CyqtPHEt5Q92At2gkCmQAM";

export function Obrigado() {
  const { onCopy, hasCopied } = useClipboard(groupLink);

  return (
    <>
      <div
        className="flex h-[28rem] w-full items-start justify-center lg:h-[42rem]"
        style={{
          backgroundImage: `url(${CurvedBG})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mt-5 text-center md:mb-10">
            <Link className="inline-block cursor-pointer text-teal-600" to="/">
              <span className="sr-only">Home</span>
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-between py-6 sm:py-4 md:flex-row">
            <div className="flex flex-1 flex-col items-center gap-2 text-center text-slate-950">
              <h1 className="text-xl font-bold md:text-4xl">
                Seu cadastro foi efetuado com sucesso!
              </h1>

              <p className="text-md my-5 md:text-xl">
                Em breve, você receberá por <b>e-mail</b> e via <b>WhatsApp</b>{" "}
                as informações necessárias para acessar todas as nossas
                funcionalidades.
                <br />
                Obrigado por fazer parte da revolução digital nas igrejas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-8 flex flex-col items-center gap-6 px-4 pb-12 lg:-mt-28">
        <h1 className="text-center text-xl font-bold md:text-4xl">
          Comunidade Connect's Church
        </h1>

        <div className="flex flex-col gap-4">
          <Button
            className="w-60 rounded-xl bg-cc-secondary hover:bg-cc-secondary/95 focus:bg-cc-secondary/95"
            asChild
          >
            <a href={groupLink} target="_blank" rel="noopener noreferrer">
              Entrar no grupo
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-60 rounded-xl"
            onClick={onCopy}
          >
            {hasCopied ? "Link copiado!" : "Copiar o link do grupo"}
          </Button>
        </div>

        <p className="text-md text-center md:text-xl">
          Junte-se à comunidade Connect e acompanhe todas as novidades de perto!
        </p>
        <QRCode value={groupLink} />
      </div>
    </>
  );
}
