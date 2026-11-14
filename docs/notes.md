# Order notes

Shoppers can leave a free-text note on an order, such as delivery instructions.

- Leading and trailing whitespace is removed.
- Control characters are removed. New lines and tabs are kept, and Windows line endings become `\n`.
- Notes are capped at 280 characters. Emoji and other symbols count as one character each.
- `cleanNote` returns `truncated: true` when the note was cut, so the UI can warn the shopper.
- A note that is empty after cleaning should not be saved (`isNoteEmpty`).
- `notePreview(note, maxChars)` gives a one-line preview for order lists, ending in `…` when the note is longer or has more lines.
