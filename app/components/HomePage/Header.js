import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-purple-500 transition-all duration-300">
                Stoxie
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/watchlist" 
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Watchlist
              </Link>
              <Link 
                href="/portfolio" 
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-purple-500 hover:bg-gray-800/50 rounded-md transition-all duration-200"
              >
                Portfolio
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg ml-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image
                  src="./HomePage/Header/02_Search.svg"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  className="opacity-50"
                />
              </div>
              <input
                type="text"
                placeholder="Search stocks..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
