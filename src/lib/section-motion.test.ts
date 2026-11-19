import { describe, expect, it } from "vitest";
import {
  MOTION_ROLE_ORDER,
  SECTION_ENTRY_VIEWPORT,
  SECTION_EXIT_PROGRESS,
  SECTION_MOTION_DURATION,
  getActiveState,
  getEntranceState,
  getEntranceTransition,
  getLifecycleReleaseProgress,
  getReleaseProgress,
  getReleaseTarget,
  isEntryBoundaryCrossed,
} from "./section-motion";

describe("section motion policy", () => {
  it("keeps the editorial role order", () => {
    expect(MOTION_ROLE_ORDER).toEqual([
      "eyebrow",
      "heading",
      "copy",
      "content",
      "item",
      "visual",
      "cta",
    ]);
  });

  it("enters from the scroll direction with compact mobile travel", () => {
    expect(getEntranceState("heading", "down", false, false)).toEqual({
      opacity: 0,
      x: -48,
      y: 28,
      scale: 1,
    });
    expect(getEntranceState("heading", "up", false, false)).toEqual({
      opacity: 0,
      x: -48,
      y: -28,
      scale: 1,
    });
    expect(getEntranceState("visual", "down", true, false)).toEqual({
      opacity: 0,
      x: 29,
      y: 20,
      scale: 0.985,
    });
    expect(getEntranceState("item", "down", false, false, 1).x).toBe(26);
  });

  it("settles and releases quietly", () => {
    expect(getActiveState()).toEqual({ opacity: 1, x: 0, y: 0, scale: 1 });
    expect(getReleaseTarget("item", "down", false, false)).toEqual({
      opacity: 0.08,
      x: 0,
      y: -22,
      scale: 0.99,
    });
    expect(getReleaseTarget("item", "up", false, false)).toEqual({
      opacity: 0.08,
      x: 0,
      y: 22,
      scale: 0.99,
    });
  });

  it("uses the requested 50% viewport entry and 90% section exit", () => {
    expect(SECTION_ENTRY_VIEWPORT).toBe(0.5);
    expect(SECTION_EXIT_PROGRESS).toBe(0.9);
    expect(getLifecycleReleaseProgress(0.89, "down")).toBe(0);
    expect(getLifecycleReleaseProgress(0.95, "down")).toBeCloseTo(0.5);
    expect(getLifecycleReleaseProgress(1, "down")).toBe(1);
  });

  it("mirrors the release cleanly while scrolling upward", () => {
    expect(getLifecycleReleaseProgress(0.11, "up")).toBe(0);
    expect(getLifecycleReleaseProgress(0.05, "up")).toBeCloseTo(0.5);
    expect(getLifecycleReleaseProgress(0, "up")).toBe(1);
    expect(getReleaseProgress("up", 0.05)).toBeCloseTo(0.5);
  });

  it("detects entry after clamped scroll progress leaves either boundary", () => {
    expect(isEntryBoundaryCrossed("down", 0.01, true, false)).toBe(true);
    expect(isEntryBoundaryCrossed("up", 0.99, false, true)).toBe(true);
    expect(isEntryBoundaryCrossed("down", 0, true, false)).toBe(false);
    expect(isEntryBoundaryCrossed("up", 1, false, true)).toBe(false);
  });

  it("disables movement under reduced motion", () => {
    expect(getEntranceState("visual", "down", false, true)).toEqual({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    });
    expect(getReleaseTarget("visual", "down", false, true)).toEqual({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    });
    expect(getEntranceTransition("cta", 0, false, true).duration).toBe(0);
  });

  it("uses restrained delays and shorter mobile stagger", () => {
    expect(getEntranceTransition("eyebrow", 0, false, false).delay).toBe(0);
    expect(getEntranceTransition("heading", 0, false, false).delay).toBe(0.07);
    expect(getEntranceTransition("item", 2, false, false).delay).toBeCloseTo(0.3);
    expect(getEntranceTransition("item", 2, true, false).delay).toBeLessThan(0.3);
    expect(getEntranceTransition("heading", 0, false, false).duration).toBe(SECTION_MOTION_DURATION);
    expect(getEntranceTransition("heading", 0, true, false).duration).toBe(SECTION_MOTION_DURATION);
  });
});
