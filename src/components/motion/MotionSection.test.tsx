import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SECTION_MOTION_DURATION } from "@/lib/section-motion";
import { MotionElement, MotionHeading, MotionSection } from "./MotionSection";

describe("MotionSection", () => {
  it("renders a semantic boundary and labeled roles", () => {
    render(
      <MotionSection aria-label="Demo chapter">
        <MotionElement role="eyebrow">Label</MotionElement>
        <MotionHeading>
          <h2>Heading</h2>
        </MotionHeading>
        <MotionElement role="item" index={1}>
          Card
        </MotionElement>
      </MotionSection>,
    );

    expect(screen.getByRole("region", { name: "Demo chapter" })).toHaveAttribute(
      "data-motion-section",
    );
    expect(screen.getByRole("region", { name: "Demo chapter" })).toHaveAttribute(
      "data-motion-entry-vh",
      "50",
    );
    expect(screen.getByRole("region", { name: "Demo chapter" })).toHaveAttribute(
      "data-motion-exit-progress",
      "90",
    );
    expect(screen.getByRole("region", { name: "Demo chapter" })).toHaveAttribute(
      "data-motion-duration-ms",
      String(SECTION_MOTION_DURATION * 1000),
    );
    expect(screen.getByText("Label").closest("[data-motion-role]")).toHaveAttribute(
      "data-motion-role",
      "eyebrow",
    );
    expect(screen.getByRole("heading").closest("[data-motion-role]")).toHaveAttribute(
      "data-motion-role",
      "heading",
    );
    expect(screen.getByText("Card").closest("[data-motion-index]")).toHaveAttribute(
      "data-motion-index",
      "1",
    );
  });

  it("supports article and footer semantics", () => {
    const view = render(
      <MotionSection as="article" aria-label="Article">
        <span>Body</span>
      </MotionSection>,
    );

    expect(screen.getByRole("article", { name: "Article" })).toBeInTheDocument();

    view.rerender(
      <MotionSection as="footer" aria-label="Footer" exit={false}>
        <span>Footer body</span>
      </MotionSection>,
    );

    expect(screen.getByRole("contentinfo", { name: "Footer" })).toHaveAttribute(
      "data-motion-exit",
      "false",
    );
  });

  it("masks headings and exposes a background handoff layer", () => {
    const { container } = render(
      <MotionSection backgroundClassName="bg-[#111]">
        <MotionHeading>
          <h2>Masked heading</h2>
        </MotionHeading>
      </MotionSection>,
    );

    expect(screen.getByRole("heading").parentElement).toHaveClass(
      "motion-heading-mask",
    );
    expect(container.querySelector("[data-motion-background]")).toHaveClass("bg-[#111]");
  });

  it("forwards the semantic root for section-specific internal motion", () => {
    const ref = createRef<HTMLElement>();

    render(<MotionSection ref={ref}>Body</MotionSection>);

    expect(ref.current?.tagName).toBe("SECTION");
  });

  it("keeps layout classes on the animated inner wrapper when requested", () => {
    render(
      <MotionSection>
        <MotionElement role="content" innerClassName="grid-layout">
          Layout content
        </MotionElement>
      </MotionSection>,
    );

    expect(
      screen.getByText("Layout content").closest("[data-motion-role]")
        ?.firstElementChild,
    ).toHaveClass("grid-layout");
  });
});
