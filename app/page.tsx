import { AboutStats } from "@/components/landing/about-stats";
import { Cta } from "@/components/landing/cta";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Partners } from "@/components/landing/partners";
import { Security } from "@/components/landing/security";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1600px] overflow-x-clip border-x border-landing-frame bg-landing-ground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <AboutStats />
        <Partners />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
