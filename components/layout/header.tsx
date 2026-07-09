"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { RoomIcon } from "@/components/room/room-icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Room", iconName: "room" },
  { href: "/resources", label: "Rương đồ", iconName: "archive" },
  { href: "/bookshelf", label: "Giá sách", iconName: "bookshelf" },
  { href: "/tools", label: "Công cụ", iconName: "toolbox" },
  { href: "/about", label: "About", iconName: "about" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="relative flex min-h-14 items-center justify-between gap-3 py-2">
        <Link href="/" className="focus-ring group flex shrink-0 items-center gap-2 rounded-xl">
          <span className="relative flex size-9 items-center justify-center rounded-2xl border border-cyan-700/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(245,158,11,0.16))] text-cyan-800 shadow-sm transition group-hover:border-cyan-600/35 dark:border-cyan-300/15 dark:text-cyan-200">
            <span className="font-mono text-xs font-black tracking-tight">TH</span>
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-amber-400 ring-2 ring-background" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-black tracking-tight">{siteConfig.name}</span>
            <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              digital room
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold text-muted transition hover:border-border hover:bg-foreground/[0.04] hover:text-foreground",
                  active && "border-border bg-foreground/[0.06] text-foreground shadow-sm",
                )}
              >
                <RoomIcon name={item.iconName} className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:text-accent md:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Đóng menu" : "Mở menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition",
                  isMenuOpen && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition",
                  isMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition",
                  isMenuOpen && "top-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-2xl border border-border bg-background p-2 shadow-soft transition md:hidden",
            isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
          )}
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "focus-ring flex min-h-11 items-center justify-between rounded-xl border border-transparent px-3 text-sm font-semibold text-muted transition hover:border-border hover:bg-foreground/[0.04] hover:text-foreground",
                    active && "border-border bg-foreground/[0.06] text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <RoomIcon name={item.iconName} className="size-4" />
                    {item.label}
                  </span>
                  {active ? <span className="text-xs text-muted">active</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </header>
  );
}
