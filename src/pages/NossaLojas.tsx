import { Link } from "react-router-dom";
import Logo from "../assets/cc-logo.svg";
import CurvedBG from "/curved-bg.svg";
import Iphone from "../assets/iphone.webp";
import AppCard from "../components/app-card";
import GooglePay from "../assets/google-pay.png";
import AppleStore from "../assets/apple-store.png";

export function NossaLojas() {
  return (
    <>
      <header className="border-b-2 border-b-cc-border bg-cc-primary py-2">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>
        </div>
      </header>
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
                Simplifique a gestão da sua igreja
              </h1>
              <p className="text-base sm:text-lg">
                Gestão completa de membros, finanças e eventos em um único
                aplicativo!
              </p>

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
            <div className="mt-4 md:mt-0">
              <img
                src={Iphone}
                alt="Celular com representação do app da Connect Church's"
                className="h-auto w-[600px]" width={600} height={501}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
