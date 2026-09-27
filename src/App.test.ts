import { describe, expect, it } from "vitest";
import { opportunities } from "./data";

describe("dados do MVP", () => {
  it("mantém todos os registros identificados como demonstração", () => {
    expect(opportunities.length).toBeGreaterThan(0);
    expect(opportunities.every(item => item.demo)).toBe(true);
  });

  it("não possui IDs duplicados", () => {
    const ids = opportunities.map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
