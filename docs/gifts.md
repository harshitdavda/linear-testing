# Gifts

## Wrapping

| Style | Price per item |
| --- | --- |
| Paper | $2.99 |
| Box | $5.99 |

- Wrapping is chosen per SKU and per item. One mug can be in paper and another in a box.
- Food can't be gift-wrapped.
- You can't wrap more items than are in the cart, counting all requests for the same SKU together.
- `wrapLines` throws with every problem listed when a request is invalid. Use `validateWrapRequests` to show the errors without throwing.

## Messages

- Up to 4 lines, each up to 40 characters. Emoji count as one character.
- Blank lines and surrounding spaces are removed.
- `formatGiftCard(message, from)` adds a "— Name" signature when a sender name is given.
