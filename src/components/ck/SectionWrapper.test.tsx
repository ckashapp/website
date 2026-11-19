import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionWrapper from "./SectionWrapper";

describe("SectionWrapper", () => {
  it("maps its header and content to the shared section lifecycle", () => {
    render(
      <SectionWrapper
        id="demo"
        eyebrow="Label"
        title="Title"
        subtitle="Copy"
      >
        <div>Body</div>
      </SectionWrapper>,
    );

    const section = screen.getByRole("region", { name: "Title" });
    expect(section).toHaveAttribute("data-motion-section");
    expect(screen.getByText("[ Label ]").closest("[data-motion-role]")).toHaveAttribute(
      "data-motion-role",
      "eyebrow",
    );
    expect(
      screen.getByRole("heading", { name: "Title" }).closest("[data-motion-role]"),
    ).toHaveAttribute("data-motion-role", "heading");
    expect(screen.getByText("Copy").closest("[data-motion-role]")).toHaveAttribute(
      "data-motion-role",
      "copy",
    );
    expect(screen.getByText("Body").closest("[data-motion-role]")).toHaveAttribute(
      "data-motion-role",
      "content",
    );
  });
});
