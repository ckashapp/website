import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import FAQ from "./FAQ";
import NotFound from "./NotFound";
import TermsAndConditions from "./TermsAndConditions";

describe("secondary route motion", () => {
  it("keeps FAQ interactions inside a shared motion chapter", () => {
    const { container } = render(
      <MemoryRouter>
        <FAQ />
      </MemoryRouter>,
    );

    expect(container.querySelector("main [data-motion-section]")).toBeInTheDocument();
    expect(container.querySelector('main [data-motion-role="heading"]')).toBeInTheDocument();
    expect(container.querySelector('main [data-motion-role="content"]')).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-motion-exit", "false");

    fireEvent.click(screen.getByRole("button", { name: /what is ckash/i }));
    expect(screen.getByText(/ckash is a multichain mobile wallet/i)).toBeInTheDocument();
  });

  it("keeps legal navigation and progress inside shared chapters", () => {
    const { container } = render(
      <MemoryRouter>
        <TermsAndConditions />
      </MemoryRouter>,
    );

    expect(container.querySelectorAll("main [data-motion-section]").length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector('main [data-motion-role="heading"]')).toBeInTheDocument();
    expect(container.querySelector('main [data-motion-role="content"]')).toBeInTheDocument();
    expect(container.querySelector(".ckash-terms-progress-bar")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Terms sections" })).toBeInTheDocument();
  });

  it("presents the not-found state as one accessible motion chapter", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { container } = render(
      <MemoryRouter initialEntries={["/missing"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(container.querySelector("[data-motion-section]")).toBeInTheDocument();
    expect(container.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return to home/i })).toHaveAttribute("href", "/");
  });
});
