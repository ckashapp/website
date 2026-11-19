import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FaApple, FaMediumM } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { RiTelegramLine } from "react-icons/ri";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const logoUrl =
  "https://res.cloudinary.com/durncdjje/image/upload/v1777965544/CKASH_LOGO_yl6msg.svg";

const groups = [
  { title: "Company", links: ["About", "Careers", "Press", "Contact", "Why Ckash"] },
  { title: "Product", links: ["Wallet", "Swap", "Payments", "Dapps", "Security"] },
  { title: "Resources", links: ["Read docs", "Blog", "FAQ", "Support", "Status"] },
];

const socialLinks = [
  { label: "X", href: "https://x.com/cKashApp", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ckash-app/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/ckashapp", icon: BsInstagram },
  { label: "Telegram", href: "https://t.me/ckashapp", icon: RiTelegramLine },
  { label: "Medium", href: "https://medium.com/@ckashApp", icon: FaMediumM },
];

export default function Footer() {
  return (
    <MotionSection
      as="footer"
      exit={false}
      id="footer"
      backgroundClassName="bg-[#151515]"
      className="mist-section grain-texture relative w-full overflow-hidden text-bone"
    >
      <div className="page-container relative py-20 md:py-28">
        <div className="space-y-5">
          {/* TOP CTA GRID */}
          <div className="grid items-stretch gap-5 lg:grid-cols-[2fr_1fr]">
            {/* BUILDERS */}
            <MotionElement role="item" index={0} innerClassName="h-full">
            <div className="ui-surface group relative h-full min-h-[390px] overflow-hidden !bg-[#101010] p-7 text-white transition-transform [transition-duration:250ms] hover:-translate-y-0.5 md:p-10">

              <div className="relative flex h-full flex-col justify-between gap-14">
                <div>
                  <span className="section-tag">
                    [ Builders ]
                  </span>

                  <h2 className="type-h2 mt-5 max-w-4xl font-display text-white">
                    Want your app inside the Ckash dapp section?
                  </h2>

                  <p className="section-subtitle !mt-6 max-w-2xl">
                    Reach stablecoin users by getting your dapp featured inside the Ckash ecosystem.
                  </p>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <div className="hidden max-w-xs text-[15px] leading-[1.6] text-white/65 sm:block">
                    Built for partners, builders, protocols, and Web3 products.
                  </div>

                  <a
                    href="mailto:support@ckash.app?subject=Dapp%20listing%20for%20Ckash"
                    aria-label="Contact Ckash for dapp listing"
                    className="ui-button ui-button-primary group/arrow ml-auto !h-11 !w-11 shrink-0 !p-0"
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover/arrow:-translate-y-0.5 group-hover/arrow:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
            </MotionElement>

            {/* GET STARTED */}
            <MotionElement role="item" index={1} innerClassName="h-full">
            <div id="download" className="group relative h-full min-h-[390px] scroll-mt-24 overflow-hidden rounded-[6px] border border-black/10 bg-[#f1f1f1] p-7 text-[#050505] transition-transform [transition-duration:250ms] hover:-translate-y-0.5 md:p-9">

              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <span className="section-tag !text-black/65">
                    [ Get started ]
                  </span>

                  <h2 className="type-h2 mt-5 font-display">
                    Start using Ckash today.
                  </h2>

                  <p className="section-subtitle !mt-5 !text-black/65">
                    Download the wallet and start moving stablecoins smoothly.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href="#download"
                    className="group/store flex min-h-14 min-w-0 flex-1 items-center justify-between gap-2 rounded-[6px] bg-[#111] px-3 py-3 text-white transition-colors duration-200 hover:bg-[#292929]"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FaApple className="h-5 w-5 shrink-0" />
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[10px] tracking-[0.08em] text-white/45">
                          Download on
                        </span>
                        <span className="block whitespace-nowrap text-[13px] font-medium leading-tight">
                          App Store
                        </span>
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/60" />
                  </a>

                  <a
                    href="#download"
                    className="group/play flex min-h-14 min-w-0 flex-1 items-center justify-between gap-2 rounded-[6px] border border-black/10 bg-white px-3 py-3 text-[#050505] transition-colors duration-200 hover:bg-[#e6e6e6]"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <IoLogoGooglePlaystore className="h-5 w-5 shrink-0" />
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[10px] tracking-[0.08em] text-black/40">
                          Get it on
                        </span>
                        <span className="block whitespace-nowrap text-[13px] font-medium leading-tight">
                          Google Play
                        </span>
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-black/45" />
                  </a>
                </div>
              </div>
            </div>
            </MotionElement>
          </div>

          {/* COMMUNITY */}
          <MotionElement role="item" index={2}>
          <div className="relative py-10 text-white">
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <MotionElement role="eyebrow"><span className="section-tag">
                  [ Community ]
                </span></MotionElement>

                <MotionHeading>
                <h2 className="type-h2 mt-4 max-w-3xl font-display">
                  Join our community on
                </h2>
                </MotionHeading>

                <MotionElement role="copy">
                <p className="section-subtitle">
                  Get product updates, ecosystem news, and community announcements.
                </p>
                </MotionElement>
              </div>

              <MotionElement role="cta" innerClassName="flex flex-wrap gap-4 lg:justify-end">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="ui-icon-button !h-12 !w-12 text-white hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </MotionElement>
            </div>
          </div>
          </MotionElement>

        </div>

        {/* MAIN FOOTER */}
        <MotionElement role="item" index={3}>
        <div className="ui-surface mt-10 grid min-w-0 gap-10 p-6 sm:p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1.4fr)] md:p-10">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <p className="max-w-md font-display text-[clamp(1.35rem,4.8vw,1.85rem)] font-medium leading-[1.22] tracking-tight text-bone">
              Move stablecoins with less friction. Build, pay, swap, and explore from one wallet.
            </p>

            <a
              href="#download"
              className="ui-button ui-button-primary w-fit"
            >
              Download app
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-bone">{group.title}</h3>

                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="group text-sm text-ash transition-colors hover:text-bone">
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                          {link}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
              
          <div className="flex min-w-0 flex-col justify-between gap-10">
            <div>
              <div className="text-sm text-bone">Subscribe to our Newsletter</div>

              <div className="mt-5 flex flex-col gap-3 border-b border-[color:var(--border-default)] pb-4 transition-colors focus-within:border-[color:var(--border-active)] sm:flex-row sm:items-center">
                <input
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-[6px] border border-[color:var(--border-default)] bg-[#111] px-4 py-3 text-sm text-bone outline-none placeholder:text-ash focus:border-[color:var(--border-active)] sm:border-0 sm:bg-transparent sm:px-0"
                />

                <button className="ui-button ui-button-primary w-full sm:w-auto">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <div>
                <div className="text-sm text-bone">Say hello</div>
                <a
                  href="mailto:support@ckash.app"
                  className="mt-4 block break-words text-sm text-ash transition-colors hover:text-bone"
                >
                  support@ckash.app
                </a>
              </div>
            </div>
          </div>
        </div>
        </MotionElement>

        {/* BOTTOM BAR */}
        <MotionElement role="content" className="mt-8 text-[12px] text-ash md:mt-10" innerClassName="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>Ckash Labs  | </span>

            <span className="inline-flex items-center gap-1.5">

              Built for borderless stablecoins
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href="/terms-and-conditions" className="transition-colors hover:text-bone">
              Terms and Conditions
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Copyright © 2026 Ckash</span>
          </div>
        </MotionElement>

        {/* LOGO */}
        <MotionElement role="visual">
        <div className="relative left-1/2 mt-10 h-[clamp(9rem,27vw,24rem)] w-screen -translate-x-1/2 overflow-hidden md:mt-12">
          <img
            data-footer-wordmark=""
            src={logoUrl}
            alt="Ckash"
            className="absolute top-0 left-0 block h-auto w-screen max-w-none object-contain opacity-[0.12]"
          />

          <div
            data-footer-wordmark-fade=""
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#151515] via-[#151515]/35 to-transparent"
          />
        </div>
        </MotionElement>
      </div>
    </MotionSection>
  );
}
