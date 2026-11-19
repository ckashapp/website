import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

afterEach(() => vi.useRealTimers());

describe("Resources navigation", () => {
  it("opens on click and closes on outside click, Escape, and item selection", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Resources" });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Read docs" })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("link", { name: "Read docs" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the trigger and menu in one hover region, then closes after a short leave delay", () => {
    vi.useFakeTimers();
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Resources" });
    const region = trigger.parentElement as HTMLElement;

    fireEvent.mouseEnter(region);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(100));
    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(100));
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(150));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when keyboard focus leaves the dropdown region", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Resources" });
    fireEvent.focus(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.blur(trigger, { relatedTarget: document.body });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the mobile menu scrollable with touch-sized controls", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByRole("dialog", { name: "Mobile navigation" })).toHaveClass("overflow-y-auto");
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveClass("min-h-11", "min-w-11");
  });
});
