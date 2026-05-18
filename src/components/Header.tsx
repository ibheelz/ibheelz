"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[55px] bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] border-b border-red px-10">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" className="text-red hover:text-red transition-colors duration-200 flex items-center gap-2">
          <img src="/favicon.png" alt="bheelz" className="w-5 h-5" />
          <span className="text-sm font-medium">bheelz@ibheelz:</span>
        </Link>

        {/* CENTER/RIGHT: Desktop Nav */}
        <nav className="hidden tablet:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 px-3 py-1 ${
                isActive(link.href)
                  ? "bg-red text-black font-extrabold"
                  : "text-red hover:bg-red hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="tablet:hidden text-red hover:text-red-dim transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[55px] left-0 right-0 bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border-b border-red tablet:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-10 py-4 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-red bg-[rgba(239,68,68,0.05)] border-l-2 border-red"
                  : "text-muted hover:text-red hover:bg-[rgba(239,68,68,0.03)]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
