import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { blogs } from "@/data/blogs";
import BlogDetailPage from "./BlogDetailPage";
import BlogPage from "./BlogPage";

function expectMotionChapters(container: HTMLElement) {
  const main = container.querySelector("main");
  expect(main?.querySelectorAll("[data-motion-section]").length).toBeGreaterThanOrEqual(2);
  expect(main?.querySelector('[data-motion-role="eyebrow"]')).toBeInTheDocument();
  expect(main?.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
  expect(main?.querySelectorAll('[data-motion-role="item"]').length).toBeGreaterThan(0);
}

describe("blog route motion", () => {
  it("organizes the blog listing into shared motion chapters", () => {
    const { container } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>,
    );

    expectMotionChapters(container);
    expect(container.querySelector("main img")).toHaveClass("w-full");
  });

  it("organizes an article and related posts into shared motion chapters", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/blog/${blogs[0].slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expectMotionChapters(container);
    expect(container.querySelector("main img")).toHaveClass("w-full", "max-w-full");
  });
});
