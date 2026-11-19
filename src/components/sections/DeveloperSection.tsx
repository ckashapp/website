import SectionWrapper from "../ck/SectionWrapper";
import { motion } from "framer-motion";
import { MotionElement } from "@/components/motion/MotionSection";

const submissions = [
  { name: "Aurora v2.1", status: "Listed", color: "bg-emerald-400" },
  { name: "Loop Payments", status: "Testing", color: "bg-amber-400" },
  { name: "Pixel Arcade", status: "Pending Review", color: "bg-ash" },
];

export default function DeveloperSection() {
  return (
    <SectionWrapper
      id="developers"
      eyebrow="Developers"
      title="Ship to millions of stablecoin users."
      subtitle="Submit your app, run it through testing, and reach the Ckash distribution network."
    >
      <MotionElement role="visual">
      <div className="ui-surface min-w-0 p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] font-sans tracking-[0.12em] text-ash">Developer dashboard</div>
            <div className="font-display text-xl text-bone mt-1">My submissions</div>
          </div>
          <button className="ui-button ui-button-primary !min-h-10">+ New app</button>
        </div>

        <div className="overflow-hidden rounded-[6px] border border-[color:var(--border-default)]">
          <div className="grid grid-cols-12 px-5 py-3 bg-ink-2 text-[11px] font-sans tracking-[0.12em] text-ash">
            <div className="col-span-5">App</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2">Version</div>
            <div className="col-span-2 text-right">Updated</div>
          </div>
          {submissions.map((s, i) => (
            <MotionElement role="item" index={i} key={s.name}>
            <motion.div
              whileHover={{ backgroundColor: "hsl(var(--ink-2))" }}
              className="grid grid-cols-12 items-center border-t border-[color:var(--border-subtle)] bg-ink px-5 py-4 transition-colors hover:bg-ink-2"
            >
              <div className="col-span-5 flex items-center gap-3">
                <span className="text-bone">{s.name}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                <span className="text-sm text-ash">{s.status}</span>
              </div>
              <div className="col-span-2 font-mono text-sm text-ash">v1.{i + 2}.0</div>
              <div className="col-span-2 font-sans text-sm text-ash text-right">2h ago</div>
            </motion.div>
            </MotionElement>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-[color:var(--border-subtle)] border-t border-[color:var(--border-subtle)]">
          {[
            ["Active users", "2.4M"],
            ["Avg. fee", "$0.001"],
            ["Uptime", "99.99%"],
          ].map(([k, v]) => (
            <div key={k} className="p-5">
              <div className="text-[11px] font-sans tracking-[0.12em] text-ash">{k}</div>
              <div className="font-financial mt-2 text-2xl font-medium text-bone">{v}</div>
            </div>
          ))}
        </div>
      </div>
      </MotionElement>
    </SectionWrapper>
  );
}
