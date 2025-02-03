import { Button } from "./ui/button";
import whatsAppLogo from "../assets/icons/whatsapp.svg";

export function WhatsAppButton() {
  return (
    <Button
      variant="link"
      className="fixed bottom-8 right-8 p-0 hover:scale-105"
      asChild
    >
      <a
        href="https://wa.me/5562981561322?text=Olá, gostaria de saber mais sobre a Connect Church's!"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="h-16 w-16"
          src={whatsAppLogo}
          alt="Entre em contato pelo WhatsApp"
        />
      </a>
    </Button>
  );
}
