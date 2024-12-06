"use client";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { PathName } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "Explore",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Wishlists",
    link: "/account-savelists",
    icon: HeartIcon,
  },
  {
    name: "Log in",
    // link: "/account",
    link: "/login",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }
      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

    if (item.name === "Log in") {
      return (
        <div
          key={index}
          onClick={() => setIsModalOpen(true)}
          className={`flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-300/90 ${
            isActive ? "text-neutral-900 dark:text-neutral-100" : ""
          }`}
        >
          <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
          <span
            className={`text-[11px] leading-none mt-1 ${
              isActive ? "text-red-600" : ""
            }`}
          >
            {item.name}
          </span>
        </div>
      );
    }

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? "text-red-600" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className={`flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
      >
        <item.icon iconClassName="w-6 h-6" />
        <span className="text-[11px] leading-none mt-1">{item.name}</span>
      </div>
    );
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
        transition-transform duration-300 ease-in-out"
      >
        <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
          {/* MENU */}
          {NAV.map(renderItem)}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Select Login Type</h2>
            <div className="space-y-2">
              <a href="/login"
                onClick={() => console.log("Client Login")}
                className="w-full mr-2 py-2 px-4 bg-blue-600 text-white rounded"
              >
                Guest Login
              </a>
              <a href="/login"
                onClick={() => console.log("Host Login")}
                className="w-full py-2 px-4 bg-green-600 text-white rounded"
              >
                Host Login
              </a>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-sm text-neutral-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterNav;
