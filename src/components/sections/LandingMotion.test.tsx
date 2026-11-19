import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogSection from "./BlogSection";
import SwapSection from "./SwapSection";
import WhyCkashSection from "./WhyCkashSection";

describe("landing page motion chapters", () => {
  it.each([
    ["Swap stablecoins instantly.", <SwapSection key="swap" />],
    ["Why Ckash?", <WhyCkashSection key="why" />],
    [
      "Notes on stablecoins, payments, and wallet UX.",
      <BlogSection key="blog" />,
    ],
  ])("maps %s to the shared lifecycle", (heading, section) => {
    const { container } = render(<MemoryRouter>{section}</MemoryRouter>);

    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    expect(container.querySelector("[data-motion-section]")).toBeInTheDocument();
    expect(container.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(container.querySelector('[data-motion-role="copy"]')).toBeInTheDocument();
    expect(
      container.querySelector(
        '[data-motion-role="content"], [data-motion-role="visual"], [data-motion-role="item"]',
      ),
    ).toBeInTheDocument();
  });
});
