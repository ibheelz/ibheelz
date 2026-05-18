"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[55px] bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] border-b border-red px-10">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-center gap-8 relative">
          {/* CENTER: Logo Image */}
          <Link href="/" className="text-red hover:text-red transition-colors duration-200">
            <img src="/favicon.png" alt="bheelz" className="w-6 h-6 object-contain" />
          </Link>

          {/* RIGHT: Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="tablet:hidden text-red hover:text-red-dim transition-colors absolute right-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="fixed top-[55px] left-0 right-0 z-50 bg-red border-b border-red px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-8 h-[45px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 px-3 py-1 font-medium ${
                isActive(link.href)
                  ? "bg-black text-red font-extrabold"
                  : "text-black hover:bg-black hover:text-red"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-[45px] left-0 right-0 bg-red border-b border-red tablet:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-10 py-3 text-sm transition-colors font-medium ${
                  isActive(link.href)
                    ? "bg-black text-red font-extrabold"
                    : "text-black hover:bg-black hover:text-red"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
