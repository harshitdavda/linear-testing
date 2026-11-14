export type CartItem = { sku: string; priceCents: number; quantity: number };

export type Cart = { items: CartItem[] };

export function createCart(): Cart {
  return { items: [] };
}

export function addItem(cart: Cart, item: CartItem): Cart {
  if (!Number.isInteger(item.quantity) || item.quantity <= 0)
    throw new Error("quantity must be a positive whole number");
  const existing = cart.items.find((i) => i.sku === item.sku);
  if (!existing) return { items: [...cart.items, item] };
  return {
    items: cart.items.map((i) =>
      i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i,
    ),
  };
}

export function removeItem(cart: Cart, sku: string): Cart {
  return { items: cart.items.filter((i) => i.sku !== sku) };
}

export function subtotal(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}
