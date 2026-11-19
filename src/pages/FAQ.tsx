import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { liftHover, smoothEase, subtleTap } from "@/lib/motion";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const faqCategories = [
  {
    category: "General",
    description:
      "The basics of Ckash, stablecoins, multichain access, and who the wallet is built for.",
    questions: [
      {
        question: "What is Ckash?",
        answer:
          "Ckash is a multichain mobile wallet that lets you send stablecoins, manage digital assets, and access Web3 apps across different blockchains in one place.",
      },
      {
        question: "What makes Ckash different from other wallets?",
        answer:
          "Ckash is built as a multichain distribution channel, giving you access not just to assets, but to payments, apps, and services across multiple ecosystems.",
      },
      {
        question: "What does \"multichain\" mean?",
        answer:
          "Multichain means Ckash supports multiple blockchains, allowing you to interact across networks without switching wallets.",
      },
      {
        question: "Who is Ckash for?",
        answer:
          "Ckash is designed for individuals, businesses, and developers who want fast payments and easy access to Web3 services.",
      },
      {
        question: "Is Ckash free to use?",
        answer:
          "Creating and using Ckash is free. You only pay small network fees when making transactions.",
      },
      {
        question: "Can I use Ckash globally?",
        answer:
          "Yes. Ckash is accessible anywhere and enables borderless payments using stablecoins.",
      },
      {
        question: "What is a stablecoin?",
        answer:
          "A stablecoin is a cryptocurrency designed to maintain a stable value, usually pegged to a currency like the US dollar.",
      },
    ],
  },
  {
    category: "Features",
    description:
      "Wallet capabilities, payments, swaps, networks, ecosystem access, and transaction tools.",
    questions: [
      {
        question: "Which blockchains does Ckash support?",
        answer:
          "Ckash supports multiple networks including Celo, Base, and other EVM-compatible blockchains.",
      },
      {
        question: "What tokens can I store in Ckash?",
        answer:
          "You can store stablecoins like USDC, USDT, cUSD, and other supported tokens across different networks.",
      },
      {
        question: "Can I send money instantly?",
        answer:
          "Yes. Ckash enables fast, near-instant transfers depending on the network used.",
      },
      {
        question: "Does Ckash support QR payments?",
        answer: "Yes. You can send and receive funds easily using QR codes.",
      },
      {
        question: "Can I switch between networks?",
        answer:
          "Yes. You can easily switch between supported blockchains within the app.",
      },
      {
        question: "Does Ckash support token swaps?",
        answer:
          "Yes. You can swap tokens across supported networks directly within the wallet.",
      },
      {
        question: "What is the \"Apps\" or ecosystem feature?",
        answer:
          "It allows you to access partner services like DeFi platforms, payment tools, and utilities directly inside Ckash.",
      },
      {
        question: "Can I track my transactions?",
        answer:
          "Yes. You can view your transaction history and track activity within the app.",
      },
      {
        question: "Can I use Ckash for business payments?",
        answer:
          "Yes. Ckash is built to support both personal and business transactions.",
      },
      {
        question: "Does Ckash support cross-chain transfers?",
        answer:
          "Ckash enables interaction across chains and may include bridging or routing features depending on the network.",
      },
    ],
  },
  {
    category: "Security",
    description:
      "Private keys, recovery phrases, wallet control, device protection, and privacy.",
    questions: [
      {
        question: "Is Ckash a custodial wallet?",
        answer:
          "No. Ckash is a self-custodial wallet, meaning you fully control your private keys and funds.",
      },
      {
        question: "Who has access to my funds?",
        answer: "Only you. Ckash does not store or control your funds.",
      },
      {
        question: "How secure is Ckash?",
        answer:
          "Ckash uses encryption, secure key management, and device-level protections to keep your wallet safe.",
      },
      {
        question: "What is a recovery (seed) phrase?",
        answer:
          "It is a set of words that allows you to recover your wallet if you lose access to your device.",
      },
      {
        question: "What happens if I lose my recovery phrase?",
        answer:
          "You may permanently lose access to your wallet. Always store it securely offline.",
      },
      {
        question: "Can I enable biometric security?",
        answer:
          "Yes. You can use fingerprint or face recognition for additional protection.",
      },
      {
        question: "Is my personal data stored?",
        answer:
          "Ckash minimizes data collection and prioritizes user privacy.",
      },
      {
        question: "How can I avoid scams?",
        answer:
          "Always verify wallet addresses, never share your recovery phrase, and be cautious of unknown links or requests.",
      },
    ],
  },
  {
    category: "Onboarding & Usage",
    description:
      "Creating a wallet, importing one, receiving funds, sending payments, and first steps.",
    questions: [
      {
        question: "How do I create a wallet?",
        answer:
          "You can create a wallet using a recovery phrase or sign up quickly with Google.",
      },
      {
        question: "Can I import an existing wallet?",
        answer:
          "Yes. Simply enter your recovery phrase to restore your wallet.",
      },
      {
        question: "How do I receive funds?",
        answer: "Share your wallet address or QR code with the sender.",
      },
      {
        question: "How do I send funds?",
        answer:
          "Enter a wallet address or scan a QR code, choose the amount, and confirm the transaction.",
      },
      {
        question: "What should I do after creating my wallet?",
        answer:
          "Secure your recovery phrase, fund your wallet, and start exploring payments and apps.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <MotionElement role="item" index={index}>
    <motion.div
      layout
      whileHover={{
        ...liftHover,
        borderColor: "var(--border-hover)",
      }}
      className="ui-surface group overflow-hidden transition-colors [transition-duration:250ms]"
    >
      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileTap={subtleTap}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        className="relative flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6"
      >
        <span className="relative text-[15px] font-medium leading-snug text-bone/88 transition-colors duration-300 group-hover:text-bone md:text-base">
          {question}
        </span>

        <motion.span
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)",
            color: open ? "#0b0b0b" : "rgba(245,241,232,0.65)",
          }}
          transition={{ duration: 0.22, ease: smoothEase }}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-[color:var(--border-default)] text-[21px] font-light leading-none"
        >
          +
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0, y: -6 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -5 }}
            transition={{
              height: { duration: 0.46, ease: smoothEase },
              opacity: { duration: 0.28, ease: smoothEase },
              y: { duration: 0.34, ease: smoothEase },
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.34, ease: smoothEase }}
              className="px-5 pb-5 pt-0 text-[15px] leading-[1.65] text-ash md:px-6"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </MotionElement>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const currentCategory = faqCategories[activeCategory];

  useEffect(() => {
    if (!categoryDropdownOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!categoryDropdownRef.current?.contains(event.target as Node)) setCategoryDropdownOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCategoryDropdownOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [categoryDropdownOpen]);

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      <Navbar />

      <main className="pt-28">
        <MotionSection className="relative overflow-hidden pb-24 pt-12">
          <div className="page-container relative max-w-4xl min-w-0">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <MotionElement role="eyebrow"><div className="section-tag justify-center">
                [ FAQ ]
              </div></MotionElement>

              <MotionHeading>
              <h1 className="type-h1 mx-auto max-w-3xl font-display">
                Questions about Ckash, answered clearly.
              </h1>
              </MotionHeading>


            </div>

            <MotionElement role="content" className="relative">
              <div ref={categoryDropdownRef} className="relative z-20 mb-8 md:hidden">
                <motion.button
                  type="button"
                  onClick={() => setCategoryDropdownOpen((open) => !open)}
                  whileTap={subtleTap}
                  aria-expanded={categoryDropdownOpen}
                  aria-controls="faq-category-dropdown"
                  className="ui-surface flex min-h-14 w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span>
                    <span className="block font-sans text-[11px] tracking-[0.12em] text-ash">
                      Category
                    </span>
                    <span className="mt-1 block text-sm font-medium text-bone">
                      {currentCategory.category}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: categoryDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: smoothEase }}
                    className="flex h-8 w-8 items-center justify-center text-bone/70"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {categoryDropdownOpen && (
                    <motion.div
                      id="faq-category-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2, ease: smoothEase }}
                      className="ui-surface absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden p-1"
                    >
                      {faqCategories.map((category, index) => {
                        const active = index === activeCategory;

                        return (
                          <motion.button
                            key={category.category}
                            type="button"
                            onClick={() => {
                              setActiveCategory(index);
                              setCategoryDropdownOpen(false);
                            }}
                            whileTap={subtleTap}
                            className={`flex min-h-11 w-full items-center justify-between rounded-[4px] px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                              active
                                ? "bg-bone text-ink"
                                : "text-bone/70 hover:bg-white/[0.055] hover:text-bone"
                            }`}
                          >
                            <span>{category.category}</span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                active ? "bg-ink" : "bg-white/20"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="ui-surface mb-8 hidden grid-cols-2 gap-2 p-1 md:grid md:grid-cols-4">
                {faqCategories.map((category, index) => {
                  const active = index === activeCategory;

                  return (
                    <motion.button
                      key={category.category}
                      type="button"
                      onClick={() => setActiveCategory(index)}
                      whileHover={{ y: -2 }}
                      whileTap={subtleTap}
                      className={`relative h-11 overflow-hidden rounded-[4px] px-3 text-center text-[13px] font-medium transition-colors duration-200 ${active
                          ? "text-ink"
                          : "text-bone/62 hover:bg-white/[0.055] hover:text-bone"
                        }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="faq-category-active"
                          className="absolute inset-0 rounded-[4px] bg-bone"
                          transition={{
                            duration: 0.55,
                            ease: smoothEase,
                          }}
                        />
                      )}

                      <span className="relative z-10">{category.category}</span>

                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory.category}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: smoothEase }}
                  className="px-0"
                >
                  <motion.div layout className="grid gap-3">
                    {currentCategory.questions.map((item, index) => (
                      <FAQItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </MotionElement>
          </div>
        </MotionSection>
      </main>

      <Footer />
    </div>
  );
}
