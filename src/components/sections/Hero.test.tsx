import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("centers the hero copy and visual composition vertically", () => {
    render(<Hero />);

    const hero = screen
      .getByRole("heading", {
        name: "Built for the next generation of multichain finance.",
      })
      .closest("#hero");
    const heroGrid = hero?.querySelector("div.grid");

    expect(heroGrid).toHaveClass("content-center");
    expect(heroGrid).not.toHaveClass("content-start");
  });
});
