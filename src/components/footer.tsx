import Instagram from "../assets/icons/instagram.svg";
// import Facebook from "../assets/icons/facebook.svg";
import Youtube from "../assets/icons/youtube.svg";
import LinkedIn from "../assets/icons/linkedin.svg";

export function Footer() {
  return (
    <footer>
      <div className="bg-cc-tertiary py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 text-sm text-slate-950 sm:flex-row sm:gap-4">
            <div className="font-bold">
              <h3 className="mb-2">ENDEREÇO</h3>
              <p className="font-normal">
                AV: T7 n° 371 QD 34 LT 1E Sala 2102 - Setor Oeste.
              </p>
              <p className="font-normal">Goiânia - GO, 74.140-110</p>
            </div>
            <div className="font-bold">
              <h3 className="mb-2">NOSSAS MÍDIAS</h3>
              <div className="flex w-52 justify-between gap-2">
                <a href="https://www.instagram.com/connect_churchs?igsh=MWp1ODZqem9iMGtuZA%3D%3D">
                  <img
                    src={Instagram}
                    alt="Instagram Logo"
                    width={32}
                    height={32}
                  />
                </a>
                {/* <a href="">
                  <img src={Facebook} alt="Facebook Logo" />
                </a> */}
                <a href="https://www.linkedin.com/in/connect-church%C2%B4s-3989a52b0/">
                  <img
                    src={LinkedIn}
                    alt="LinkedIn Logo"
                    width={32}
                    height={32}
                  />
                </a>
                <a href="https://www.youtube.com/@ConnectChurch-dh6gi">
                  <img
                    src={Youtube}
                    alt="Youtube Logo"
                    width={40}
                    height={32}
                  />
                </a>
              </div>
            </div>
            <div className="font-bold">
              <h3 className="mb-2">CONTATOS</h3>
              <p>
                Email:{" "}
                <a
                  className="font-normal"
                  href="mailto:connectchrchs@connectchurchs.com.br"
                >
                  connectchrchs@connectchurchs.com.br
                </a>
              </p>
              <p>
                Telefone:{" "}
                <a className="font-normal" href="">
                  (62) 98156-1322
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cc-secondary">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center text-sm text-white">
            <p>
              Todos os Direitos Reservados a{" "}
              <a
                className="font-bold decoration-solid hover:text-white/75"
                href="https://codecraftershub.com.br"
              >
                Code Crafters
              </a>{" "}
              |{" "}
              <a
                className="font-bold decoration-solid hover:text-white/75"
                href="https://gestaoccs.com.br/policy"
              >
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
