"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { LogOut } from "lucide-react"; // Import Logout icon

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(true);

  useEffect(() => {
    if (pathname === "/sign-in") {
      setShowLogout(false);
    } else {
      setShowLogout(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("User logged out");
    router.push("/sign-in");
  };

  return (
    <div className="h-24 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          CONNECT
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-end gap-4 xl:gap-8">
        {showLogout && (
          <>
            {/* Desktop Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>

            {/* Mobile Logout Icon Button */}
            <button
              onClick={handleLogout}
              className="block sm:hidden bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition duration-300"
              aria-label="Logout"
            >
              <LogOut className="text-white w-5 h-5" />
            </button>

            <MobileMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
