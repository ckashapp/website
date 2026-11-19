import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const steps = [
  {
    title: "Create your wallet",
    description: "Set up Ckash with Google, Apple, or restore an existing wallet.",
    cta: "Download app",
    image: "https://res.cloudinary.com/durncdjje/image/upload/v1778002918/010_1_xhwljy.png",
  },
  {
    title: "Fund your wallet",
    description: "Add supported stablecoins and keep your balance ready to use.",
    cta: "Add funds",
    image: "https://res.cloudinary.com/durncdjje/image/upload/v1778002920/013_1_xwrrck.png",
  },
  {
    title: "Move your money",
    description: "Send, swap and spend stablecoins from one simple wallet.",
    cta: "Start moving",
    image: "https://res.cloudinary.com/durncdjje/image/upload/v1778002921/011_1_hoatvd.png",
  },
];

function StepCopy({ index, interactive = true }: { index: number; interactive?: boolean }) {
  const step = steps[index];

  return (
    <>
      <h3 className="type-step font-display text-bone">
        {step.title}
      </h3>
      <p className="section-subtitle !mt-5 max-w-[27rem]">
        {step.description}
      </p>
      <a
        href="#footer"
        tabIndex={interactive ? undefined : -1}
        className="ui-text-link group mt-8 w-fit focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {step.cta}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </>
  );
}

export default function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Read which step is closest to the viewport center. Scrolling remains native.
    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      setActiveIndex((current) => current === closestIndex ? current : closestIndex);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);
    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <MotionSection
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      backgroundClassName="bg-[#111]"
      className="relative py-20 md:py-28"
    >
      <div className="page-container">
        <header className="max-w-2xl">
          <MotionElement role="eyebrow"><div className="section-tag mb-0">[ Get started ]</div></MotionElement>
          <MotionHeading>
          <h2
            id="how-it-works-heading"
            className="type-h2 mt-6 font-display text-bone"
          >
            Three steps. You're in.
          </h2>
          </MotionHeading>
          <MotionElement role="copy">
          <p className="section-subtitle !mt-5 max-w-[33rem]">
            From setup to your first transaction, Ckash keeps the process simple.
          </p>
          </MotionElement>
        </header>

        {/* Mobile keeps every step in document flow; the phone is never sticky. */}
        <div className="mt-16 space-y-20 lg:hidden">
          {steps.map((step, index) => (
            <MotionElement role="item" index={index} key={step.title}>
              <StepCopy index={index} />
              <img
                src={step.image}
                alt={`Ckash app showing ${step.title.toLowerCase()}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="mx-auto mt-10 max-h-[470px] w-auto max-w-[min(68%,240px)] object-contain"
              />
            </MotionElement>
          ))}
        </div>

        <div className="mt-20 hidden grid-cols-[minmax(0,43%)_minmax(0,57%)] items-start lg:grid lg:mt-24">
          <MotionElement role="content">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(node) => { stepRefs.current[index] = node; }}
                data-step={index}
                className="flex min-h-[72vh] items-center py-14"
              >
                <div
                  aria-hidden={index !== activeIndex}
                  className={`flex max-w-md flex-col items-start pr-8 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : index < activeIndex
                        ? "pointer-events-none -translate-y-[10px] opacity-0"
                        : "pointer-events-none translate-y-[12px] opacity-0"
                  }`}
                >
                  <StepCopy index={index} interactive={index === activeIndex} />
                  <div aria-hidden="true" className="mt-12 flex items-center gap-3">
                    {steps.map((item, dotIndex) => (
                      <span
                        key={item.title}
                        className={`h-[5px] w-[5px] rounded-full ${
                          dotIndex === index ? "bg-white/90" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </MotionElement>

          <MotionElement role="visual" className="relative min-h-[18rem] w-full pl-0 lg:sticky lg:top-[16vh] lg:h-[72vh] lg:min-h-0 lg:pl-8" innerClassName="flex h-full w-full items-center justify-center">
            <div
              role="img"
              aria-label={`Ckash app showing ${steps[activeIndex].title.toLowerCase()}`}
              className="relative aspect-[899/1795] h-full max-h-[680px] w-auto max-w-full"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={steps[activeIndex].image}
                  data-active-step-image=""
                  src={steps[activeIndex].image}
                  alt=""
                  aria-hidden="true"
                  loading={activeIndex === 0 ? "eager" : "lazy"}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-fill motion-reduce:!opacity-100 motion-reduce:!blur-none"
                />
              </AnimatePresence>
            </div>
          </MotionElement>
        </div>
      </div>
    </MotionSection>
  );
}
