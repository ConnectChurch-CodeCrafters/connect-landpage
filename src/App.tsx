import { AboutUs } from "./components/about-us";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Functionalities } from "./components/functionalities";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Modules } from "./components/modules";
import { Plans } from "./components/plans";

export function App() {
  return (
    <>
      <Header />
      <Hero />
      <Functionalities />
      <Modules />
      <Plans />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}
