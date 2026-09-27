import { describe,expect,it } from "vitest"; import { opportunities } from "./data";
describe("dados do MVP",()=>{it("marca todos como demonstração",()=>{expect(opportunities.length).toBeGreaterThan(0);expect(opportunities.every(x=>x.demo)).toBe(true)});it("não possui IDs duplicados",()=>{const ids=opportunities.map(x=>x.id);expect(new Set(ids).size).toBe(ids.length)})});
