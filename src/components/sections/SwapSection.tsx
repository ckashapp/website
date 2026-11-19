import { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { liftHover, smoothEase, subtleTap } from "@/lib/motion";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const leftImage = "https://res.cloudinary.com/durncdjje/image/upload/v1777993202/ChatGPT_Image_May_5_2026_03_53_07_PM_1_oxuujx.png";
const rightImage = "https://res.cloudinary.com/durncdjje/image/upload/v1777993283/ChatGPT_Image_May_5_2026_03_53_55_PM_1_t7zew2.png";

function SideImage({
  side,
  src,
  progress,
}: {
  side: "left" | "right";
  src: string;
  progress: MotionValue<number>;
}) {
  const travel = side === "left" ? "62vw" : "-62vw";
  const x = useTransform(progress, [0, 0.44, 0.88, 1], ["0vw", "0vw", travel, travel]);
  const y = useTransform(progress, [0, 0.44, 0.68, 0.88, 1], [34, 0, -16, 0, 0]);
  const rotate = useTransform(progress, [0, 0.44, 0.88, 1], [0, 0, side === "left" ? 2.4 : -2.4, 0]);
  const scale = useTransform(progress, [0, 0.44, 0.68, 0.88, 1], [0.98, 1, 0.96, 1, 1]);

  return (
    <motion.img
      data-motion-index={side === "left" ? 0 : 1}
      data-motion-role="visual"
      data-swap-side={side}
      src={src}
      alt=""
      style={{ x, y, rotate, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 1, ease: smoothEase }}
      className={`pointer-events-none absolute bottom-0 hidden h-[90%] w-auto object-contain lg:block ${side === "left" ? "left-0" : "right-0"}`}
    />
  );
}

export default function SwapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <MotionSection
      id="swap"
      ref={sectionRef}
      className="mist-section grain-texture snap-section relative flex items-center overflow-hidden !py-20 text-white md:!py-28"
    >
      <SideImage side="left" src={leftImage} progress={scrollYProgress} />
      <SideImage side="right" src={rightImage} progress={scrollYProgress} />

      <div className="page-container relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="hidden lg:block" />

        <div className="mx-auto max-w-xl px-6 py-8 text-center md:px-8">
          <MotionElement role="eyebrow">
          <div className="section-tag justify-center">
            [ Swap ]
          </div>
          </MotionElement>
          <MotionHeading>
          <h2 className="section-title text-white">
            Swap stablecoins instantly.
          </h2>
          </MotionHeading>
          <MotionElement role="copy">
          <p className="section-subtitle mx-auto">
            Routed for low fees, tight spreads, and fast settlement across supported networks.
          </p>
          </MotionElement>

          <MotionElement role="cta">
          <motion.a
            href="#download"
            whileHover={liftHover}
            whileTap={subtleTap}
            className="ui-button ui-button-primary mt-8"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          </MotionElement>
        </div>

        <div className="hidden lg:block" />
      </div>
    </MotionSection>
  );
}
