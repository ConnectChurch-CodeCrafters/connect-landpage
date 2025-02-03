import { ContactParceiro } from "@/components/embaixadores";
import { Link } from "react-router-dom";
import Logo from "../assets/cc-logo.svg";
import CurvedBG from "/curved-bg.svg";

export function Embaixador() {
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
                Seja muito bem vindo!
              </h1>

              <p className="text-md my-5 md:text-xl">
                Preencha seus dados a baixo que entraremos em contato para mais informações.
                <br />
                Obrigado por fazer parte da revolução digital nas igrejas.
                <br />
              </p>
            </div>
          </div>
          <ContactParceiro />
        </div>
      </div>
    </>
  );
}
