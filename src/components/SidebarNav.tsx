"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
};

export type SidebarNavProps = {
  title?: string;
  subtitle?: string;
  items: NavItem[];
  footer?: React.ReactNode;
  className?: string;
};

export default function SidebarNav({
  title = "Dashboard",
  subtitle = "Navigation",
  items,
  footer,
  className,
}: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={[
        "w-full max-w-[280px] h-full bg-white rounded-2xl shadow-sm border border-gray-100",
        className ?? "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-black">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l2-2 7-7 7 7 2 2" />
              <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
            </svg>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <nav className="p-3">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = isActive(item.href);

            const base =
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all";
            const activeCls =
              "bg-black text-white shadow-sm";
            const inactiveCls =
              "text-gray-700 hover:bg-gray-50";
            const disabledCls =
              "opacity-50 cursor-not-allowed";

            const cls = [
              base,
              active ? activeCls : inactiveCls,
              item.disabled ? disabledCls : "",
            ].join(" ");

            const content = (
              <>
                {item.icon && (
                  <span className={active ? "text-white" : "text-gray-400"}>
                    {item.icon}
                  </span>
                )}

                <span className="flex-1">{item.label}</span>

                {item.badge && (
                  <span
                    className={[
                      "text-[11px] px-2 py-0.5 rounded-full border",
                      active
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600",
                    ].join(" ")}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            );

            return (
              <li key={item.href}>
                {item.disabled ? (
                  <div className={cls}>{content}</div>
                ) : (
                  <Link className={cls} href={item.href}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-gray-100">{footer}</div>
      )}
    </aside>
  );
}