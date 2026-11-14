export type GiftCard = {
  code: string;
  initialCents: number;
  balanceCents: number;
};

const CODE_PATTERN = /^[A-Z0-9]{4}(-[A-Z0-9]{4}){3}$/;

export function normalizeGiftCardCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidGiftCardCode(code: string): boolean {
  return CODE_PATTERN.test(normalizeGiftCardCode(code));
}

export function issueGiftCard(code: string, amountCents: number): GiftCard {
  if (!isValidGiftCardCode(code)) {
    throw new Error(`invalid gift card code: ${code}`);
  }
  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new Error("gift card amount must be a positive number of cents");
  }
  return {
    code: normalizeGiftCardCode(code),
    initialCents: amountCents,
    balanceCents: amountCents,
  };
}

export function isExhausted(card: GiftCard): boolean {
  return card.balanceCents === 0;
}
