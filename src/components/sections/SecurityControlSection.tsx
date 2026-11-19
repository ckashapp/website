import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const securityImage =
  "https://res.cloudinary.com/durncdjje/image/upload/v1778139604/ChatGPT_Image_May_7__2026__08_00_09_AM-removebg-preview_p7ftcr.png";

export default function SecurityControlSection() {
  return (
    <MotionSection
      id="security"
      backgroundClassName="bg-[#070707]"
      className="snap-section relative flex items-center overflow-hidden py-10 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-30%] h-[320px] w-[320px] rounded-full bg-white/[0.06] blur-[90px]" />
        <div className="absolute bottom-[-35%] right-[-8%] h-[380px] w-[380px] rounded-full bg-white/[0.04] blur-[100px]" />
      </div>

      <div className="page-container relative z-10 grid h-full items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <MotionElement role="eyebrow" className="mb-5 inline-flex">
          <div className="inline-flex items-center gap-2 rounded-[4px] border border-[color:var(--border-default)] bg-white/[0.04] px-4 py-2 text-sm text-white/55">
            <ShieldCheck className="h-4 w-4 text-white/70" />
            Security & control
          </div>
          </MotionElement>

          <MotionHeading>
          <h2 className="type-h2 max-w-3xl font-display text-white">
            Keep control of your stablecoins from the first tap.
          </h2>
          </MotionHeading>

          <MotionElement role="copy">
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Built to make wallet security feel simple, direct, and easy to
            understand.
          </p>
          </MotionElement>


        </div>

        <MotionElement role="visual" className="relative h-full min-h-[260px]" innerClassName="flex h-full items-center justify-center">
          <div className="absolute h-[320px] w-[320px] rounded-full bg-white/[0.05] blur-[80px]" />

          <img
            src={securityImage}
            alt="Ckash wallet security and control interface"
            className="relative z-10 block h-auto max-h-[92%] w-full max-w-[560px] object-contain drop-shadow-[0_42px_120px_rgba(0,0,0,0.7)]"
          />
        </MotionElement>
      </div>
    </MotionSection>
  );
}
