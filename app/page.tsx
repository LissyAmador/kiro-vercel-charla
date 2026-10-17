import { Concepts } from "@/components/Concepts";
import { Feedback } from "@/components/Feedback";
import { Deploy } from "@/components/Deploy";
import { FooterCta } from "@/components/FooterCta";
import { Gallery } from "@/components/Gallery";
import { Guide } from "@/components/Guide";
import { Hero } from "@/components/Hero";
import { KiroIntro } from "@/components/KiroIntro";
import { Navbar } from "@/components/Navbar";
import { Speaker } from "@/components/Speaker";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Concepts />
        <KiroIntro />
        <Guide />
        <Deploy />
        <Gallery />
        <Speaker />
        <Feedback />
      </main>
      <FooterCta />
    </>
  );
}
