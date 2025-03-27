import { describe, it, expect } from "vitest";

describe("Pruebas básicas", () => {
  it("suma correctamente dos números", () => {
    expect(1 + 1).toBe(2);
  });

  it("una cadena puede ser analizada", () => {
    expect("hello world").toContain("world");
  });

  it("los objetos pueden ser comparados", () => {
    const data = { name: "test", value: 42 };
    expect(data).toEqual({ name: "test", value: 42 });
  });
});
