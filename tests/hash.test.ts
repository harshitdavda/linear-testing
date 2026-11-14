import { describe, expect, it } from "vitest";
import { fnv1a } from "../src/util/hash";
import { escapeHtml } from "../src/util/html";

describe("fnv1a", () => {
  it("matches known values", () => {
    expect(fnv1a("")).toBe("811c9dc5");
    expect(fnv1a("a")).toBe("e40c292c");
  });

  it("is stable and input-sensitive", () => {
    expect(fnv1a("checkout")).toBe(fnv1a("checkout"));
    expect(fnv1a("checkout")).not.toBe(fnv1a("checkouts"));
  });
});

describe("escapeHtml", () => {
  it("escapes markup characters", () => {
    expect(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;",
    );
  });
});
