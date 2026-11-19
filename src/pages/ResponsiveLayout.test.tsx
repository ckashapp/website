import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "./Index";
import BlogPage from "./BlogPage";
import FAQ from "./FAQ";
import NotFound from "./NotFound";

describe("responsive route structure", () => {
  it.each([
    ["landing page", () => <Index />],
    ["blog page", () => <BlogPage />],
    ["faq page", () => <FAQ />],
    ["not found page", () => <NotFound />],
  ])("mounts %s through the shared responsive route structure", (_name, createPage) => {
    const { container } = render(<MemoryRouter>{createPage()}</MemoryRouter>);

    expect(container.firstElementChild).toBeTruthy();
    expect(container.querySelector("[data-motion-section]")).toBeInTheDocument();
  });
});
