// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getLinkClasses = (path: string) => {
    if (isActive(path)) {
      return "text-purple-600 font-medium border-b-2 border-purple-600 pb-1 transition";
    }
    return "text-gray-600 hover:text-purple-600 font-medium transition";
  };

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 shadow-sm border-b">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Deep Fitness Hub
          </span>
        </div>
        
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/trainers" className={getLinkClasses("/trainers")}>
              Trainers
            </Link>
          </li>
          <li>
            <Link href="/blogs" className={getLinkClasses("/blogs")}>
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/calculators" className={getLinkClasses("/calculators")}>
              Calculators
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}