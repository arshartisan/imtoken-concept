"use client";

import { Accordion, AccordionItem } from "@/components/base/accordion/accordion";
import { Reveal } from "./reveal";

const FAQS = [
  {
    id: "custody",
    q: "Does imToken hold my crypto or private keys?",
    a: "No. imToken is a self-custody wallet. Your private keys and recovery phrase are generated and encrypted on your device, and only you can access them.",
  },
  {
    id: "networks",
    q: "Which networks are supported?",
    a: "Bitcoin, Ethereum, TRON, Polkadot, Cosmos, BNB Chain, Arbitrum, Litecoin and many more — over 40 networks and thousands of tokens in one app.",
  },
  {
    id: "recovery",
    q: "What happens if I lose my phone?",
    a: "Restore your wallet on any device with your recovery phrase. Back it up offline during setup — without it, nobody (including imToken) can recover your funds.",
  },
  {
    id: "imkey",
    q: "What is imKey and do I need it?",
    a: "imKey Pro is a hardware wallet that signs transactions offline. It is optional, but recommended for large holdings or long-term storage.",
  },
  {
    id: "fees",
    q: "Does imToken charge fees?",
    a: "Downloading and using the wallet is free. You pay standard network fees for transactions, and swaps show any service fee before you confirm.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-landing-frame py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="font-serif text-section-serif text-landing-ink text-balance">Questions, Answered</h2>
          <p className="mt-5 max-w-[360px] text-headline-regular text-text-secondary">
            Still unsure? Our help center covers setup, security and recovery step by step.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <Accordion variant="contained" defaultExpandedKeys={["custody"]} className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.id} id={f.id} title={f.q}>
                <p>{f.a}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
