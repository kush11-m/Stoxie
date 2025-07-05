"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <h1 className="text-2xl font-light bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-purple-500 transition-all duration-300 leading-tight py-1">
                Stoxie
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 text-sm font-light text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/watchlist" 
                className="px-4 py-2 text-sm font-light text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Watchlist
              </Link>
              <Link 
                href="/portfolio" 
                className="px-4 py-2 text-sm font-light text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Portfolio
              </Link>
            </nav>
          </div>

          {/* Search Bar and Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-700 rounded-md px-3 py-1 w-64 bg-gray-800/50">
              <Image
                src="./HomePage/Header/02_Search.svg"
                alt="Search Icon"
                width={20}
                height={20}
                className="opacity-50"
              />
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-full text-gray-200 outline-none text-sm bg-transparent pl-2 font-light"
              />
            </div>
            {!user ? (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 text-sm font-light rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="px-4 py-2 text-sm font-light rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="px-4 py-2 text-sm font-light rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
