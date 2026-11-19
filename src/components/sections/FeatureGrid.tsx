import { ArrowRight } from "lucide-react";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

type Feature = {
  title: string;
  description: string;
  cta: string;
  image: string;
};

const features: Feature[] = [
  {
    title: "Multi-chain wallet",
    description:
      "Manage supported stablecoins across multiple networks from one unified wallet.",
    cta: "Explore",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976798/ChatGPT_Image_May_5_2026_11_09_45_AM_zrztxq.avif",
  },
  {
    title: "Stablecoin swaps",
    description:
      "Move between USDC, USDT and supported assets through simple, efficient routes.",
    cta: "Swap",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976798/ChatGPT_Image_May_5_2026_11_10_44_AM_zlbunq.avif",
  },
  {
    title: "Local payments",
    description:
      "Turn stablecoin value into practical payments for everyday use.",
    cta: "Pay",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976797/ChatGPT_Image_May_5_2026_11_12_13_AM_uvqzam.avif",
  },
  {
    title: "Global transfers",
    description:
      "Send value across borders without the friction of traditional payment rails.",
    cta: "Send",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1778062386/ChatGPT_Image_May_5_2026_11_20_50_AM_yf8bfv.avif",
  },
  {
    title: "Secure access",
    description:
      "Simple wallet access designed around security, control and ownership.",
    cta: "Secure",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976797/ChatGPT_Image_May_5_2026_11_17_47_AM_sqmkwv.avif",
  },
  {
    title: "Low-cost movement",
    description:
      "Move money efficiently with fast settlement and lower transaction costs.",
    cta: "Move",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976798/ChatGPT_Image_May_5_2026_11_18_46_AM_bb8pat.avif",
  },
];

export default function FeatureGrid() {
  return (
    <MotionSection
      id="wallet"
      aria-labelledby="feature-grid-heading"
      backgroundClassName="bg-[#080808]"
      className="snap-section relative isolate overflow-hidden !py-20 md:!py-24 lg:!py-28"
    >
      <div className="page-container min-w-0">
        <header className="mb-12 max-w-2xl md:mb-16">
          <MotionElement role="eyebrow"><p className="section-tag mb-0">
            [ Ckash features ]
          </p></MotionElement>

          <MotionHeading>
          <h2
            id="feature-grid-heading"
            className="type-h2 mt-6 max-w-xl font-display text-bone"
          >
            Everything your money needs.
          </h2>
          </MotionHeading>

          <MotionElement role="copy">
          <p className="section-subtitle !mt-5 max-w-[60ch]">
            One wallet for holding, swapping, sending, and spending stablecoins
            — built for everyday movement across currencies, networks, and
            borders.
          </p>
          </MotionElement>
        </header>

        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionElement role="item" index={index} key={feature.title}>
              <article
                className="ui-surface group relative min-h-[300px] min-w-0 overflow-hidden !bg-[var(--surface-page)] p-5 transition-[transform,border-color] [transition-duration:250ms] ease-smooth hover:-translate-y-0.5 hover:!border-[color:var(--border-hover)] sm:min-h-[328px] sm:p-6 lg:min-h-[360px] lg:p-7"
              >
                <div className="relative z-20 max-w-[18rem]">
                  <h3 className="type-card-title font-display text-white/90">
                    {feature.title}
                  </h3>
                  <p className="type-card-body mt-3 text-white/65">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[44%] overflow-hidden bg-transparent">
                  <img
                    src={feature.image}
                    alt={`${feature.title} feature preview`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute bottom-[-8%] left-[20%] h-[112%] w-[72%] object-contain object-center grayscale saturate-0 brightness-[0.72] contrast-[1.06] opacity-65 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)] transition-[opacity,filter] duration-300 group-hover:brightness-[0.8] group-hover:opacity-75"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,var(--surface-page)_0%,rgba(8,8,8,0.3)_34%,rgba(8,8,8,0.04)_72%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent"
                  />
                </div>

                <span className="type-card-action absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 text-white/80 sm:bottom-6 sm:left-6 lg:bottom-7 lg:left-7">
                  {feature.cta}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-white/45 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>

              </article>
            </MotionElement>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
