import { describe, expect, it } from "vitest";
import {
  cleanNote,
  isNoteEmpty,
  MAX_NOTE_LENGTH,
  notePreview,
} from "../src/notes";

describe("cleanNote", () => {
  it("trims whitespace", () => {
    expect(cleanNote("  leave at the door  ")).toEqual({
      note: "leave at the door",
      truncated: false,
    });
  });

  it("strips control characters but keeps new lines and tabs", () => {
    expect(cleanNote("ring\u0007 bell\r\nflat 2\tB\u007f").note).toBe(
      "ring bell\nflat 2\tB",
    );
  });

  it("caps long notes", () => {
    const result = cleanNote("a".repeat(MAX_NOTE_LENGTH + 20));
    expect(result.truncated).toBe(true);
    expect(result.note).toHaveLength(MAX_NOTE_LENGTH);
  });

  it("counts emoji as one character", () => {
    const note = "🎁".repeat(MAX_NOTE_LENGTH);
    expect(cleanNote(note)).toEqual({ note, truncated: false });
  });
});

describe("isNoteEmpty", () => {
  it("treats blank and control-only notes as empty", () => {
    expect(isNoteEmpty("   ")).toBe(true);
    expect(isNoteEmpty("\u0000\u0001")).toBe(true);
    expect(isNoteEmpty("hi")).toBe(false);
  });
});

describe("notePreview", () => {
  it("returns short single-line notes as they are", () => {
    expect(notePreview("leave at door", 20)).toBe("leave at door");
  });

  it("cuts long notes with an ellipsis", () => {
    expect(notePreview("please leave it with the neighbour", 12)).toBe(
      "please leav…",
    );
  });

  it("shows only the first line", () => {
    expect(notePreview("gate code 42\nback door", 40)).toBe("gate code 42…");
  });

  it("rejects tiny limits", () => {
    expect(() => notePreview("hi", 1)).toThrow();
  });
});
