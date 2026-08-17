"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import type { SessionData } from "@/types";

export function SiteHeader({ session }: { session: SessionData | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const nav = [
    ["Books", "/books"],
    ["Categories", "/#categories"],
    ["Orders", "/orders"],
  ];

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link href="/" className="wordmark" aria-label="NV Bookstore home">
            <span className="wordmark__monogram">NV</span>
            <span><strong>NV Bookstore</strong><small>Stories, thoughtfully shelved.</small></span>
          </Link>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <form action="/books" className="main-nav__search" role="search">
              <Search size={17} aria-hidden="true" />
              <label className="sr-only" htmlFor="mobile-search">Search books</label>
              <input id="mobile-search" name="q" placeholder="Search title, author, ISBN" />
            </form>
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className={pathname === href ? "is-active" : ""} onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
            <div className="main-nav__mobile-account">
              {session ? <><Link href="/account">Account</Link><button className="text-button" onClick={logout}>Log out</button></> : <Link href="/login">Sign in</Link>}
            </div>
          </nav>
          <form action="/books" className="header-search" role="search">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="header-search">Search books</label>
            <input id="header-search" name="q" placeholder="Title, author, ISBN" />
          </form>
          <div className="header-actions">
            <Link href={session ? "/account" : "/login"} className="icon-button" aria-label={session ? "Your account" : "Sign in"}><UserRound /></Link>
            <button className="icon-button cart-button" aria-label={`Open cart with ${count} items`} onClick={() => setOpen(true)}>
              <ShoppingBag /><span aria-hidden="true">{count}</span>
            </button>
            <button className="icon-button menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle menu">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
