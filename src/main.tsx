import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home.tsx";
import "./global.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NossaLojas } from "./pages/NossaLojas.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <Toaster />
      </>
    ),
  },
  {
    path: "nossas-lojas",
    element: <NossaLojas />,
  },
  {
    path: "obrigado",
    element: <Obrigado />,
  },
  {
    path: "embaixador",
    element: <Embaixador />,
  },
]);
import Modal from "react-modal";
import { Obrigado } from "./pages/Obrigado.tsx";
import { Embaixador } from "./pages/Embaixador.tsx";
import { WhatsAppButton } from "./components/whatsapp-button.tsx";

Modal.setAppElement("#root"); // Defina o elemento principal da aplicação

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <WhatsAppButton />
  </React.StrictMode>,
);
