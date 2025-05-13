"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.documentElement.style.overflow = "hidden"; // HTML element
      document.body.style.overflow = "hidden"; // Body element
    } else {
      // Enable scrolling
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/reported-content" onClick={() => setIsOpen(false)}>
            User With Warnings
          </Link>
          <Link href="/users" onClick={() => setIsOpen(false)}>
            Users
          </Link>
          <Link href="/analytics" onClick={() => setIsOpen(false)}>
            Analytics
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
