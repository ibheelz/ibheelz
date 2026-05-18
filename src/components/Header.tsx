"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const desktopNavLinks = [
  { label: "work", href: "/projects" },
];

const mobileNavPages = [
  { label: "home", href: "/" },
  { label: "work", href: "/projects" },
  { label: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const getCurrentPageIndex = () => {
    return mobileNavPages.findIndex((page) => page.href === pathname);
  };

  const goToPreviousPage = () => {
    const currentIndex = getCurrentPageIndex();
    const previousIndex = currentIndex === 0 ? mobileNavPages.length - 1 : currentIndex - 1;
    router.push(mobileNavPages[previousIndex].href);
  };

  const goToNextPage = () => {
    const currentIndex = getCurrentPageIndex();
    const nextIndex = currentIndex === mobileNavPages.length - 1 ? 0 : currentIndex + 1;
    router.push(mobileNavPages[nextIndex].href);
  };

  const currentPageLabel = mobileNavPages[getCurrentPageIndex()]?.label || "home";

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[55px] bg-[rgba(0,0,0,0.8)] backdrop-blur-[10px] border-b border-red px-10">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-center gap-8">
          {/* CENTER: Logo Image */}
          <Link href="/" className="text-red hover:text-red transition-colors duration-200">
            <img src="/favicon.png" alt="bheelz" className="w-9 h-9 object-contain" />
          </Link>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="fixed top-[55px] left-0 right-0 z-50 bg-red border-b border-red px-10">
        <div className="max-w-[1200px] mx-auto h-[45px] flex items-center justify-center">
          {/* Navigation with Arrows */}
          <div className="flex items-center justify-center gap-4 bg-black px-4 py-2">
            <button
              onClick={goToPreviousPage}
              className="text-red text-xl font-bold"
            >
              ❮
            </button>
            <div className="text-sm font-medium text-red">{currentPageLabel}</div>
            <button
              onClick={goToNextPage}
              className="text-red text-xl font-bold"
            >
              ❯
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
