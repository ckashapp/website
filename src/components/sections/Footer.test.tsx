import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("is the final entrance-only motion chapter", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("data-motion-section");
    expect(footer).toHaveAttribute("data-motion-exit", "false");
    expect(footer.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(footer.querySelectorAll('[data-motion-role="item"]').length).toBeGreaterThan(1);

    const buildersCard = screen.getByRole("heading", {
      name: "Want your app inside the Ckash dapp section?",
    }).closest(".ui-surface");
    const downloadCard = screen.getByRole("heading", {
      name: "Start using Ckash today.",
    }).closest("#download");

    expect(buildersCard).toHaveClass("h-full");
    expect(downloadCard).toHaveClass("h-full");
    expect(buildersCard?.closest('[data-motion-role="item"]')?.firstElementChild).toHaveClass("h-full");
    expect(downloadCard?.closest('[data-motion-role="item"]')?.firstElementChild).toHaveClass("h-full");
    expect(screen.getByText("Download on")).toHaveClass("whitespace-nowrap");
    expect(screen.getByText("App Store")).toHaveClass("whitespace-nowrap");

    const mainFooterCard = screen.getByText(
      "Move stablecoins with less friction. Build, pay, swap, and explore from one wallet.",
    ).closest(".ui-surface") as HTMLElement;
    expect(within(mainFooterCard).queryByText("Follow us")).not.toBeInTheDocument();
    expect(within(mainFooterCard).queryByRole("link", { name: "X" })).not.toBeInTheDocument();

    const wordmark = footer.querySelector("[data-footer-wordmark]");
    const wordmarkFade = footer.querySelector("[data-footer-wordmark-fade]");
    expect(wordmark).toHaveClass("top-0", "w-screen", "max-w-none", "opacity-[0.12]");
    expect(wordmark).not.toHaveClass("w-[150vw]", "opacity-70", "bottom-[-18%]");
    expect(wordmarkFade).toHaveClass("bottom-0", "h-[20%]");

  });
});
