import CkButton from "../ck/CkButton";
import { ArrowRight } from "lucide-react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

export default function FinalCTA() {
  return (
    <MotionSection id="download" className="snap-section relative flex items-center justify-center py-10">
      <div className="page-container text-center">
        <div className="section-heading section-heading-center">
          <MotionElement role="eyebrow">
          <div className="section-tag justify-center">
            [ Download ]
          </div>
          </MotionElement>
          <MotionHeading>
          <h2 className="section-title">
            Move stablecoins like cash.
          </h2>
          </MotionHeading>
          <MotionElement role="copy">
          <p className="section-subtitle mx-auto">
            Launch Ckash or read the docs to start building with stablecoin payments.
          </p>
          </MotionElement>
        </div>
        <MotionElement role="cta" className="mt-5" innerClassName="flex items-center justify-center gap-3">
          <CkButton size="lg" icon={<ArrowRight className="h-4 w-4" />}>Launch Ckash</CkButton>
          <CkButton size="lg" variant="secondary">Read the docs</CkButton>
        </MotionElement>
      </div>
    </MotionSection>
  );
}
