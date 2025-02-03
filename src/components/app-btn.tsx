import { Button } from "./ui/button";
import LinkIcon from "../assets/icons/link.svg";
import { Link } from "react-router-dom";

// Definir uma interface para o objeto window que inclua MSStream
/*
interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}
  */

export function AppBtn() {
  /*
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as WindowWithMSStream).MSStream;
  const isMac =
    /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent) && !isIOS;

  const appLink =
    isIOS || isMac
      ? "https://apps.apple.com/br/app/connectchurchs/id6479539575"
      : "https://play.google.com/store/apps/details?id=appc.connect.appcom";
  */

  return (
    <Button
      className="mx-auto mt-2 rounded-xl bg-cc-secondary px-12 hover:bg-cc-secondary/95 md:mx-0"
      asChild
    >
      <Link to="/nossas-lojas">
        <img src={LinkIcon} className="mr-2" alt="Link Icon" />
        Baixar o App
      </Link>
    </Button>
  );
}
