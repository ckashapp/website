import SectionWrapper from "../ck/SectionWrapper";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { liftHover, subtleTap } from "@/lib/motion";
import { MotionElement } from "@/components/motion/MotionSection";

export default function AuthSection() {
  return (
    <SectionWrapper
      id="auth"
      eyebrow="Sign in"
      title="Your wallet. Your keys."
      subtitle="Sign in with the providers you trust, or bring your own recovery phrase."
    >
      <div className="grid min-w-0 gap-12 md:grid-cols-2 md:items-center">
        <MotionElement role="visual">
        <motion.div whileHover={liftHover} className="ui-surface max-w-md p-8">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl text-bone">Welcome to Ckash</h3>
            <p className="text-sm text-ash mt-1">Sign in to continue</p>
          </div>

          <div className="space-y-2.5">
            <motion.button whileTap={subtleTap} className="ui-button ui-button-primary w-full">
              <span>G</span> Continue with Google
            </motion.button>
            <motion.button whileTap={subtleTap} className="ui-button ui-button-secondary w-full">
              Continue with Apple
            </motion.button>
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-[color:var(--border-subtle)]" />
              <span className="text-[11px] font-sans tracking-[0.12em] text-ash">or</span>
              <div className="flex-1 h-px bg-[color:var(--border-subtle)]" />
            </div>
            <motion.button whileTap={subtleTap} className="ui-button ui-button-secondary w-full">
              <KeyRound className="h-4 w-4" /> Use recovery phrase
            </motion.button>
          </div>

          <p className="text-[11px] text-ash text-center mt-6 leading-relaxed">
            Self-custodial. Your keys never leave your device.
          </p>
        </motion.div>
        </MotionElement>

        <MotionElement role="content" className="max-w-md" innerClassName="space-y-8">
          {[
            { t: "Self-custodial by default", b: "Keys live on your device, encrypted with biometrics." },
            { t: "Recoverable, never lost", b: "Optional encrypted backups via your provider." },
            { t: "Audited end-to-end", b: "Cryptography reviewed by leading security firms." },
          ].map((x) => (
            <div key={x.t}>
              <div className="font-display text-lg text-bone">{x.t}</div>
              <p className="text-sm text-ash mt-1 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </MotionElement>
      </div>
    </SectionWrapper>
  );
}
