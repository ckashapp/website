import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeatureGrid from "./FeatureGrid";

const expectedFeatures = [
  {
    title: "Multi-chain wallet",
    description:
      "Manage supported stablecoins across multiple networks from one unified wallet.",
    cta: "Explore",
  },
  {
    title: "Stablecoin swaps",
    description:
      "Move between USDC, USDT and supported assets through simple, efficient routes.",
    cta: "Swap",
  },
  {
    title: "Local payments",
    description:
      "Turn stablecoin value into practical payments for everyday use.",
    cta: "Pay",
  },
  {
    title: "Global transfers",
    description:
      "Send value across borders without the friction of traditional payment rails.",
    cta: "Send",
  },
  {
    title: "Secure access",
    description:
      "Simple wallet access designed around security, control and ownership.",
    cta: "Secure",
  },
  {
    title: "Low-cost movement",
    description:
      "Move money efficiently with fast settlement and lower transaction costs.",
    cta: "Move",
  },
];

describe("FeatureGrid", () => {
  it("presents the wallet feature set with supporting visuals and actions", () => {
    render(<FeatureGrid />);

    const section = screen.getByRole("region", {
      name: "Everything your money needs.",
    });

    expect(section).toHaveAttribute("data-motion-section");
    expect(section.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(section.querySelectorAll('[data-motion-role="item"]')).toHaveLength(6);

    expect(within(section).getByText("[ Ckash features ]")).toBeInTheDocument();
    expect(
      within(section).getByText(
        "One wallet for holding, swapping, sending, and spending stablecoins — built for everyday movement across currencies, networks, and borders.",
      ),
    ).toBeInTheDocument();

    const cards = within(section).getAllByRole("article");
    expect(cards).toHaveLength(6);
    cards.forEach((card) => {
      expect(card).toHaveClass("!bg-[var(--surface-page)]");
    });

    ["01", "02", "03", "04", "05", "06"].forEach((number) => {
      expect(within(section).queryByText(number)).not.toBeInTheDocument();
    });

    expectedFeatures.forEach(({ title, description, cta }, index) => {
      expect(
        within(cards[index]).getByRole("heading", { name: title }),
      ).toBeInTheDocument();
      expect(within(cards[index]).getByText(description)).toBeInTheDocument();
      expect(within(cards[index]).getByText(cta)).toBeInTheDocument();
      const image = within(cards[index]).getByRole("img", {
        name: `${title} feature preview`,
      });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("loading", index < 3 ? "eager" : "lazy");
      expect(image).toHaveClass("mix-blend-screen");
      expect(image.className).toContain("[mask-image:");
    });

    expect(within(section).getAllByRole("img")).toHaveLength(6);
  });
});
