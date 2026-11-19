import { ReactNode, useId } from "react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

export default function SectionWrapper({
  children, id, className = "", eyebrow, title, subtitle,
}: {
  children: ReactNode; id?: string; className?: string;
  eyebrow?: string; title?: string; subtitle?: string;
}) {
  const generatedId = useId();
  const headingId = `${id ?? generatedId}-heading`;

  return (
    <MotionSection
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`snap-section relative flex flex-col justify-center !py-20 md:!py-28 ${className}`}
    >
      <div className="page-container">
        {(eyebrow || title || subtitle) && (
          <header className="section-heading">
            {eyebrow && (
              <MotionElement role="eyebrow">
                <div className="section-tag">[ {eyebrow} ]</div>
              </MotionElement>
            )}
            {title && (
              <MotionHeading>
                <h2 id={headingId} className="section-title">{title}</h2>
              </MotionHeading>
            )}
            {subtitle && (
              <MotionElement role="copy">
                <p className="section-subtitle">{subtitle}</p>
              </MotionElement>
            )}
          </header>
        )}
        <MotionElement role="content">{children}</MotionElement>
      </div>
    </MotionSection>
  );
}
