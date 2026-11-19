import { act, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HowItWorks from "./HowItWorks";

const steps = [
  ["Create your wallet", "Set up Ckash with Google, Apple, or restore an existing wallet.", "Download app"],
  ["Fund your wallet", "Add supported stablecoins and keep your balance ready to use.", "Add funds"],
  ["Move your money", "Send, swap and spend stablecoins from one simple wallet.", "Start moving"],
];

describe("HowItWorks", () => {
  it("uses the requested copy, original product screens, and no numbered progress UI", () => {
    const { container } = render(<HowItWorks />);
    const section = screen.getByRole("region", { name: "Three steps. You're in." });

    expect(section).toHaveAttribute("data-motion-section");
    expect(section.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(section.querySelector('[data-motion-role="visual"]')).toBeInTheDocument();
    expect(section.querySelector('[data-motion-role="visual"]')).toHaveClass("lg:sticky");
    expect(section.querySelector('[data-motion-role="visual"]')).not.toHaveClass("sticky");

    expect(within(section).getByText("[ Get started ]")).toBeInTheDocument();
    expect(within(section).getByText("From setup to your first transaction, Ckash keeps the process simple.")).toBeInTheDocument();

    steps.forEach(([title, description, cta]) => {
      expect(within(section).getAllByText(title)).toHaveLength(2);
      expect(within(section).getAllByText(description)).toHaveLength(2);
      expect(within(section).getAllByText(cta)).toHaveLength(2);
    });

    const productImages = container.querySelectorAll('img[src*="res.cloudinary.com"]');
    expect(productImages).toHaveLength(4);
    expect(container.querySelectorAll("[data-active-step-image]")).toHaveLength(1);
    expect(section.textContent).not.toMatch(/\b0[123]\b|0[123]\s*\/\s*03/);
    expect(section).not.toHaveClass("snap-section");
  });

  it("dissolves to one active handset image as steps enter the viewport", async () => {
    const { container } = render(<HowItWorks />);
    const secondStep = container.querySelector('[data-step="1"]') as HTMLElement;
    vi.spyOn(secondStep, "getBoundingClientRect").mockReturnValue({
      top: 125,
      height: window.innerHeight * 0.72,
    } as DOMRect);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(secondStep.firstElementChild).toHaveAttribute("aria-hidden", "false");
    expect(container.querySelector('[data-step="0"]')?.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(within(secondStep).getByRole("link", { name: "Add funds" })).toHaveAttribute("href", "#footer");
    expect(within(secondStep).getByRole("link", { name: "Add funds" })).not.toHaveAttribute("tabindex", "-1");
    expect(within(container.querySelector('[data-motion-role="visual"]') as HTMLElement).getByRole("img", { name: "Ckash app showing fund your wallet" })).toBeInTheDocument();
    await waitFor(() => {
      const activeImage = container.querySelector("[data-active-step-image]");
      expect(activeImage).toHaveAttribute("src", expect.stringContaining("013_1_xwrrck.png"));
      expect(container.querySelectorAll("[data-active-step-image]")).toHaveLength(1);
    });
  });
});
