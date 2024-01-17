"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/profile-avatar";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { DropdownMenuRadioGroupDemo } from "@/components/alarm-menu";
import { SheetDemo } from "./friend-tab";

export default function Navbar() {
  const [state, setState] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Add closing the navbar menu when navigating
    const handleState = () => {
      document.body.classList.remove("overflow-hidden");
      setState(false);
    };

    handleState();
  }, [pathname, searchParams]);

  return (
    <header>
      <nav
        className={`shadow-[0_5px_10px_-5px_rgba(0,0,0,0.6)] w-full md:static md:text-sm ${
          state ? "fixed z-10 h-full" : ""
        }`}
      >
        <div className="custom-screen items-center mx-auto md:flex">
          <div className="flex items-center justify-between py-4 md:py-5 md:block">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="close"
                className="mx-6"
                width={190}
                height={78}
                priority
              />
            </Link>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:pb-0 md:mt-0 md:block ${
              state ? "" : "hidden"
            }`}
          >
            <ul className="text-gray-700 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:text-gray-600 md:font-medium mr-8">
              <li>
                <Link href="/profile/1">
                  <ProfileAvatar />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <DropdownMenuRadioGroupDemo />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <SheetDemo />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
