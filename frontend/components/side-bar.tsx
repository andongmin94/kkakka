"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./dark-mode";

export default function SidebarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 shadow-[0_5px_10px_-1px_rgba(0,0,0,0.6)] w-60 ">
        <div className="space-y-3">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-8 text-2xl font-dnf">
              <li
                className={clsx("rounded-sm", {
                  "shadow-inner-lg": pathname === "/itemShop",
                })}
              >
                <Link
                  href="/itemShop"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8 mt-6"
                >
                  아이템샵
                </Link>
              </li>
              <li
                className={clsx("rounded-sm", {
                  "shadow-inner-lg": pathname === "/chat",
                })}
              >
                <Link
                  href="/chat"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  메시지함
                </Link>
              </li>
              <li
                className={clsx("rounded-sm", {
                  "shadow-inner-lg": pathname === "/settings",
                })}
              >
                <Link
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  환경 설정
                </Link>
              </li>
              <li
                className={clsx("rounded-sm", {
                  "shadow-inner-lg": pathname === "/document",
                })}
              >
                <Link
                  href="document"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  서비스 소개
                </Link>
              </li>
              <li className="rounded-sm">
                <p className="flex items-center p-2 space-x-3 rounded-md mx-8">
                  <ModeToggle />
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div> </div>
      </div>
      {children}
    </div>
  );
}
