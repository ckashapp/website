import { motion } from "framer-motion";
import SectionWrapper from "../ck/SectionWrapper";
import TokenBadge from "../ck/TokenBadge";
import { Check } from "lucide-react";
import { liftHover, subtleTap } from "@/lib/motion";
import { MotionElement } from "@/components/motion/MotionSection";

export default function PaymentsSection() {
  return (
    <SectionWrapper
      id="payments"
      eyebrow="Payments"
      title="Pay anywhere. Settle in local currency."
      subtitle="Your stablecoin balance, spendable at checkout."
    >
      <div className="grid min-w-0 gap-12 md:grid-cols-2 md:items-center">
        <MotionElement role="content" className="max-w-lg" innerClassName="space-y-6">
          <p className="text-lg text-bone leading-relaxed text-balance">
            Ckash converts stablecoins to local fiat at the moment of payment — at the rate you see, with no surprise fees.
          </p>
          <div className="space-y-3">
            {["Pay merchants in 40+ currencies", "Real-time FX, no hidden spread", "Instant confirmation"].map((t) => (
              <div key={t} className="flex items-center gap-3 text-sm text-ash">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-ink-3">
                  <Check className="h-3 w-3 text-bone" />
                </div>
                {t}
              </div>
            ))}
          </div>
        </MotionElement>

        <MotionElement role="visual">
        <motion.div
          whileHover={{ y: -2 }}
          className="ui-surface ml-auto w-full max-w-md p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-sans tracking-[0.12em] text-ash">Paying</div>
              <div className="mt-1 font-display text-xl text-bone">Lumière Café</div>
            </div>
          </div>

          <div className="my-8 text-center">
            <div className="font-sans text-[11px] tracking-[0.12em] text-ash">Total</div>
            <div className="font-financial font-display text-5xl font-medium text-bone mt-2">€42.<span className="text-ash">00</span></div>
            <div className="font-financial mt-2 text-[13px] text-ash">≈ 45.78 USDC · rate 1.090</div>
          </div>

          <div className="flex items-center justify-between rounded-[6px] border border-[color:var(--border-default)] bg-ink-3/60 p-3">
            <div className="flex items-center gap-3">
              <TokenBadge token="USDC" />
              <div>
                <div className="text-sm text-bone">USDC</div>
                <div className="font-financial text-[12px] text-ash">Balance 4,060.42</div>
              </div>
            </div>
            <span className="text-[11px] font-sans text-ash">Auto</span>
          </div>

          <motion.button
            whileHover={liftHover}
            whileTap={subtleTap}
            className="ui-button ui-button-primary mt-5 w-full">
            Confirm payment
          </motion.button>
          <div className="mt-3 text-center text-[11px] font-sans text-ash">Settles in &lt; 2 seconds</div>
        </motion.div>
        </MotionElement>
      </div>
    </SectionWrapper>
  );
}
