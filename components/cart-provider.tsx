"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Book, CartItem } from "@/types";
import { calculateOrderTotal, clampQuantity } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  totals: ReturnType<typeof calculateOrderTotal>;
  count: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  addBook: (book: Book, quantity?: number) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nv-bookstore-cart-v2";

function readLocalCart(): CartItem[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        "bookId" in item &&
        typeof item.bookId === "string" &&
        /^[a-f\d]{24}$/i.test(item.bookId) &&
        "slug" in item && typeof item.slug === "string" &&
        "title" in item && typeof item.title === "string" &&
        "author" in item && typeof item.author === "string" &&
        "coverUrl" in item && typeof item.coverUrl === "string" &&
        "price" in item && typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0 &&
        "stock" in item && typeof item.stock === "number" && Number.isInteger(item.stock) && item.stock >= 0 &&
        "quantity" in item && typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 10,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children, authenticated }: { children: React.ReactNode; authenticated: boolean }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const synced = useRef(false);

  useEffect(() => {
    let active = true;
    const localItems = readLocalCart();
    async function hydrate() {
      if (authenticated) {
        try {
          const response = await fetch("/api/cart/merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: localItems.map(({ bookId, quantity }) => ({ bookId, quantity })),
            }),
          });
          if (response.ok) {
            const body = await response.json();
            localStorage.removeItem(STORAGE_KEY);
            if (active) setItems(body.data.items);
          } else if (active) setItems(localItems);
        } catch {
          if (active) setItems(localItems);
        }
      } else if (active) {
        setItems(localItems);
      }
      if (active) {
        synced.current = true;
        setReady(true);
      }
    }
    void hydrate();
    return () => {
      active = false;
    };
  }, [authenticated]);

  useEffect(() => {
    if (!ready || !synced.current) return;
    if (!authenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return;
    }
    const timer = window.setTimeout(() => {
      void fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ bookId, quantity }) => ({ bookId, quantity })) }),
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [authenticated, items, ready]);

  const addBook = useCallback((book: Book, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.bookId === book.id);
      if (existing) {
        return current.map((item) =>
          item.bookId === book.id
            ? { ...item, quantity: clampQuantity(item.quantity + quantity, book.stock) }
            : item,
        );
      }
      return [
        ...current,
        {
          bookId: book.id,
          slug: book.slug,
          title: book.title,
          author: book.author,
          coverUrl: book.coverUrl,
          price: book.price,
          stock: book.stock,
          quantity: clampQuantity(quantity, book.stock),
        },
      ];
    });
    setOpen(true);
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.bookId === bookId ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems((current) => current.filter((item) => item.bookId !== bookId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(
    () => ({
      items,
      totals: calculateOrderTotal(items),
      count: items.reduce((total, item) => total + item.quantity, 0),
      open,
      setOpen,
      addBook,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, open, addBook, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider.");
  return context;
}
