import { Check, X } from "lucide-react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const rows = [
  { feature: "Multichain by default", ckash: true, wallets: false, fintech: false },
  { feature: "dApp distribution layer", ckash: true, wallets: false, fintech: false },
  { feature: "Self-custodial", ckash: true, wallets: true, fintech: false },
  { feature: "Google / Apple sign-in", ckash: true, wallets: false, fintech: true },
  { feature: "Free swaps, $0.05 fees", ckash: true, wallets: false, fintech: false },
  { feature: "Borderless payments", ckash: true, wallets: true, fintech: false },
];

const columns = [
  { key: "ckash", label: "Ckash" },
  { key: "wallets", label: "Single-chain wallets" },
  { key: "fintech", label: "Traditional fintech" },
] as const;

function Mark({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
        active
          ? "bg-white text-[#111]"
          : "border border-white/20 text-white/30"
      }`}
    >
      {active ? (
        <Check className="h-4 w-4" strokeWidth={2} />
      ) : (
        <X className="h-4 w-4" strokeWidth={1.6} />
      )}
    </span>
  );
}

export default function WhyCkashSection() {
  return (
    <MotionSection
      id="why-ckash"
      backgroundClassName="bg-[#1a1a1a]"
      className="
        mist-section 
        grain-texture 
        relative 
        block 
        w-full 
        overflow-hidden 
        py-20
        text-white
        lg:py-28
      "
    >
      <div className="page-container min-w-0">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <MotionElement role="eyebrow">
          <div className="section-tag">
            [ Compare ]
          </div>
          </MotionElement>

          <MotionHeading>
          <h2 className="type-h2 font-display text-white">
            Why Ckash?
          </h2>
          </MotionHeading>

          <MotionElement role="copy">
          <p className="section-subtitle">
            Compare Ckash with single-chain wallets and traditional fintech apps.
          </p>
          </MotionElement>
        </div>

        <MotionElement
          role="visual"
          className="
            ui-surface
            w-full 
            overflow-hidden 
          "
        >
          <div
            className="
              w-full
              overflow-x-auto
              overflow-y-hidden
              scroll-smooth
              [-webkit-overflow-scrolling:touch]
              [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-track]:bg-white/[0.04]
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-white/20
            "
          >
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[color:var(--border-subtle)]">
                  <th className="sticky left-0 z-20 min-w-[190px] bg-[#1a1a1a] px-4 py-4 text-[12px] font-medium tracking-[0.06em] text-white/65 sm:min-w-[240px] sm:px-6 sm:py-5">
                    Feature
                  </th>

                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`min-w-[170px] px-4 py-4 text-center text-xs font-medium sm:px-6 sm:py-5 sm:text-sm ${
                        column.key === "ckash" ? "text-white" : "text-white/50"
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className="group border-b border-[color:var(--border-subtle)] last:border-b-0"
                  >
                    <td className="sticky left-0 z-10 min-w-[190px] bg-[#1a1a1a] px-4 py-4 text-xs font-medium text-white/85 group-hover:text-white sm:min-w-[240px] sm:px-6 sm:py-5 sm:text-sm">
                      {row.feature}
                    </td>

                    {columns.map((column) => {
                      return (
                        <td
                          key={column.key}
                          className={`px-4 py-4 text-center sm:px-6 sm:py-5 ${column.key === "ckash" ? "bg-white/[0.04]" : ""}`}
                        >
                          <Mark active={row[column.key]} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center border-t border-[color:var(--border-subtle)] px-4 py-3 md:hidden">
            <p className="text-[12px] text-white/65">
              Swipe horizontally
            </p>
          </div>
        </MotionElement>
      </div>
    </MotionSection>
  );
}
