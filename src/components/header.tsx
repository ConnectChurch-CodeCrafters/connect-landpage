import { useState } from "react";
import Logo from "../assets/cc-logo.svg";
import { Button } from "./ui/button";

export function Header() {
  const [isNavButtonClicked, setIsNavButtonClicked] = useState(false);

  const sectionIds = {
    modulos: "#modulos",
    planos: "#planos",
    sobreNos: "#sobre-nos",
    contato: "#contato",
  };

  function handleNavButton() {
    setIsNavButtonClicked(!isNavButtonClicked);
  }

  function MobileNav() {
    return (
      <nav aria-label="Global" className="py-2">
        <ul className="flex flex-col items-center gap-6 text-base font-semibold">
          <li>
            <a
              className="text-slate-950 transition hover:text-slate-950/75"
              href={sectionIds.modulos}
            >
              {" "}
              Nossos Módulos{" "}
            </a>
          </li>

          {/* <li>
            <a
              className="text-slate-950 transition hover:text-slate-950/75"
              href="#"
            >
              {" "}
              Nossos Objetivos{" "}
            </a>
          </li> */}

          <li>
            <a
              className="text-slate-950 transition hover:text-slate-950/75"
              href={sectionIds.sobreNos}
            >
              {" "}
              Sobre Nós{" "}
            </a>
          </li>

          <li>
            <a
              className="text-slate-950 transition hover:text-slate-950/75"
              href={sectionIds.planos}
            >
              {" "}
              Planos{" "}
            </a>
          </li>

          <li>
            <a
              className="text-slate-950 transition hover:text-slate-950/75"
              href={sectionIds.contato}
            >
              {" "}
              Contato{" "}
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <header className="border-b-2 border-b-cc-border bg-cc-primary py-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <img src={Logo} alt="Logo" width={224} height={70} />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-base font-semibold">
                <li>
                  <a
                    className="text-slate-950 transition hover:text-slate-950/75"
                    href={sectionIds.modulos}
                  >
                    {" "}
                    Nossos Módulos{" "}
                  </a>
                </li>

                {/* <li>
                  <a
                    className="text-slate-950 transition hover:text-slate-950/75"
                    href="#"
                  >
                    {" "}
                    Nossos Objetivos{" "}
                  </a>
                </li> */}

                <li>
                  <a
                    className="text-slate-950 transition hover:text-slate-950/75"
                    href={sectionIds.sobreNos}
                  >
                    {" "}
                    Sobre Nós{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-slate-950 transition hover:text-slate-950/75"
                    href={sectionIds.planos}
                  >
                    {" "}
                    Planos{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-slate-950 transition hover:text-slate-950/75"
                    href={sectionIds.contato}
                  >
                    {" "}
                    Contato{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <Button variant="outline" size="icon" onClick={handleNavButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isNavButtonClicked && <MobileNav />}
      </div>
    </header>
  );
}
