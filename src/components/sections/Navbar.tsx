import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FaMediumM } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { RiTelegramLine } from "react-icons/ri";
import { microTransition, smoothEase, subtleTap } from "@/lib/motion";

const links = [
  { label: "View demo", href: "/#how-it-works" },
  { label: "Support", href: "/#download" },
];

const resourceLinks = [
  { label: "Read docs", href: "/#developers" },
  { label: "Blog", href: "/blog" },
  // { label: "Whitepaper", href: "/#whitepaper" },
  { label: "FAQ", href: "/faq" },
];

const mobileNavbarLinks = [
  ...links,
  { label: "Resources", href: "/faq" },
  { label: "Download app", href: "/#download" },
];

const mobilePrimaryLinks = [
  { label: "What it does", href: "/#wallet" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Swap", href: "/#swap" },
  { label: "Why Ckash", href: "/#why-ckash" },
  { label: "Support", href: "/#download" },
];

const mobileSocials = [
  { label: "X", href: "https://x.com/cKashApp", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ckash-app/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/ckashapp", icon: BsInstagram },
  { label: "Telegram", href: "https://t.me/ckashapp", icon: RiTelegramLine },
  { label: "Medium", href: "https://medium.com/@ckashApp", icon: FaMediumM },
];

const logoUrl = "https://res.cloudinary.com/durncdjje/image/upload/v1777965544/CKASH_LOGO_yl6msg.svg";

export default function Navbar() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelResourcesClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleResourcesClose = () => {
    cancelResourcesClose();
    closeTimerRef.current = setTimeout(() => setResourcesOpen(false), 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!resourcesOpen && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (resourcesOpen && !resourcesRef.current?.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [resourcesOpen, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: smoothEase }}
        className="fixed left-0 right-0 top-0 z-50 w-full"
      >
        <div className="w-full">
          <div className="flex h-20 w-full items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] bg-[#080808]/95 px-5 backdrop-blur-md sm:px-6 md:px-10">
            <motion.a
              href="/"
              whileTap={subtleTap}
              transition={microTransition}
              className="flex min-w-0 items-center gap-3"
              aria-label="Ckash home"
            >
              <img
                src={logoUrl}
                alt="Ckash"
                className="h-8 w-auto shrink-0"
              />
            </motion.a>
            <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-[6px] border border-[color:var(--border-subtle)] bg-[#151515] p-1 md:flex">
              <div
                ref={resourcesRef}
                className="relative"
                onMouseEnter={() => { cancelResourcesClose(); setResourcesOpen(true); }}
                onMouseLeave={scheduleResourcesClose}
                onFocusCapture={() => { cancelResourcesClose(); setResourcesOpen(true); }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) setResourcesOpen(false);
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => { cancelResourcesClose(); setResourcesOpen(true); }}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                  aria-controls="resources-dropdown"
                  whileTap={subtleTap}
                  transition={microTransition}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] px-4 text-[13px] font-medium text-[color:var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
                </motion.button>
                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      id="resources-dropdown"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2, ease: smoothEase }}
                      className="absolute left-0 top-full w-[min(18rem,calc(100vw-2rem))] pt-2"
                    >
                      <div className="rounded-[6px] border border-[color:var(--border-default)] bg-[#151515] p-1 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                        {resourceLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setResourcesOpen(false)}
                          className="block rounded-[4px] px-3 py-2.5 text-[13px] font-medium text-[color:var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                        >
                          {link.label}
                        </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileTap={subtleTap}
                  transition={microTransition}
                  className="inline-flex min-h-10 items-center rounded-[4px] px-4 text-[13px] font-medium text-[color:var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <motion.a
                href="/#download"
                whileTap={subtleTap}
                transition={microTransition}
                className="ui-button ui-button-primary shrink-0 !min-h-10 !text-[13px]"
              >
                Download app
              </motion.a>

              <motion.button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                whileTap={subtleTap}
                className="ui-icon-button flex !h-11 !w-11 text-bone md:hidden"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: smoothEase }}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            className="fixed inset-0 z-[70] max-h-[100dvh] overflow-y-auto overscroll-contain bg-[#050505] text-bone md:hidden"
          >
            {/* SCROLL CONTAINER */}
            <div className="relative z-10 flex min-h-full flex-col px-6 py-6">

              {/* HEADER */}
              <div className="flex items-center justify-between">
                {/* MATCH DESKTOP LOGO */}
                <img src={logoUrl} alt="Ckash" className="h-8 w-auto" />

                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="ui-icon-button min-h-11 min-w-11 !h-11 !w-11"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* NAV CONTENT */}
              <div className="mt-12 space-y-12">

                {/* PRODUCT */}
                <div>
                  <p className="mb-5 text-[11px] tracking-[0.12em] text-ash/80">
                    Product
                  </p>

                  <div className="space-y-2">
                    {mobilePrimaryLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex min-h-11 items-center justify-between rounded-[6px] px-4 py-3 text-[17px] font-medium text-bone/80 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                      >
                        {link.label}

                        <ArrowRight className="h-4 w-4 opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* RESOURCES */}
                <div>
                  <p className="mb-5 text-[11px] tracking-[0.12em] text-ash/80">
                    Resources
                  </p>

                  <div className="space-y-2">
                    {resourceLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex min-h-11 items-center justify-between rounded-[6px] px-4 py-3 text-[15px] text-bone/60 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                      >
                        {link.label}

                        <ArrowRight className="h-3.5 w-3.5 opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-3">
                  <motion.a
                    href="/#download"
                    whileTap={subtleTap}
                    className="ui-button ui-button-primary w-full"
                  >
                    Download app
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>

                  <motion.a
                    href="/#how-it-works"
                    whileTap={subtleTap}
                    className="ui-button ui-button-secondary w-full"
                  >
                    View demo
                  </motion.a>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-14 border-t border-[color:var(--border-subtle)] pt-6">
                <p className="text-sm text-bone/60 leading-relaxed">
                  Move stablecoins freely. Swap, pay, and explore from one wallet.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-bone/60">
                  {mobileSocials.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noreferrer"
                      className="ui-icon-button !h-10 !w-10 hover:text-white"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
