// import CurvedBG from "../assets/curved-bg.svg";
import CurvedBG from "/curved-bg.svg";
import Iphone from "../assets/iphone.webp";
import LinkIcon from "../assets/icons/link.svg";
import { Button } from "./ui/button";
import { isMobile } from "@/helpers/is-mobile";
import downloadOnPlayStoreSvg from "@/assets/buttons/download_on_play_store.svg";
import downloadOnAppStoreSvg from "@/assets/buttons/download_on_app_store.svg";

export function Hero() {
  return (
    <div
      id="hero-section"
      className="flex w-full items-start justify-center lg:h-[42rem]"
      style={{
        backgroundImage: `url(${CurvedBG})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between py-6 sm:py-4 md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-2 text-center text-slate-950 sm:items-start md:text-left">
            <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">
              Deixe a gestão da sua igreja mais simples
            </h1>
            <p className="text-base sm:text-lg">
              Gestão completa de membros, tesouraria, estudo bíblico, desafio
              bíblico, pedido de oração e muito mais.
            </p>

            {/* <Button className="mx-auto mt-2 rounded-xl px-12 md:mx-0">
              <img src={LinkIcon} className="mr-2"></img>Conhecer APP
              <a href="https://www.youtube.com/watch?v=m0bpFCcqVwY"><img src={LinkIcon} className="mr-2"></img>Conhecer APP</a>
            </Button> */}

            {isMobile() ? (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <a href="https://play.google.com/store/apps/details?id=appc.connect.appcom">
                  <img src={downloadOnPlayStoreSvg} className="h-10 w-32" />
                </a>

                <a href="https://apps.apple.com/br/app/connectchurchs/id6479539575">
                  <img src={downloadOnAppStoreSvg} className="w-32" />
                </a>
              </div>
            ) : (
              <Button asChild className="mx-auto mt-2 rounded-xl px-12 md:mx-0">
                <a href="https://www.youtube.com/watch?v=m0bpFCcqVwY">
                  <img src={LinkIcon} className="mr-2"></img>Conhecer APP
                </a>
              </Button>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <img
              src={Iphone}
              alt="Celular com representação do app da Connect Church's"
              className="h-auto w-[600px]"
              width={600}
              height={501}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
