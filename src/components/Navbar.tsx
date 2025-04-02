"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

  

export const Navbar = () => {

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Insert Website", path: "/insertlink" },
    ];

    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex items-center space-x-4">
          <MessageSquare className="size-10 text-blue-500" />
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                <Link
                  href={link.path}
                  className="px-3 py-2 rounded no-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      );
}

export default Navbar;