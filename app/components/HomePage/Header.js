import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-black shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo + Company + Nav */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          {/* <img src="./HomePage/Header/01_Logo.svg" alt="logo" className="h-8 w-8" /> */}
          <h1 className="text-xl font-bold text-purple-600">Stoxie</h1>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex items-center border border-white-300 rounded-md px-3 py-1 w-64">
        <Image
          src="./HomePage/Header/02_Search.svg"
          alt="Search Icon"
          width={28}
          height={28}
          className="opacity-70 pr-2"
        />
        <input
          type="text"
          placeholder="Search stocks..."
          className="w-full text-white-800 outline-none text-sm"
        />
      </div>
    </header>
  );
}
