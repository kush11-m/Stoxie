"use client";
import Footer from "../components/HomePage/Footer";
import Header from "../components/HomePage/Header";
import { useAuth } from '../components/AuthProvider';
import Link from "next/link";

export default function Watchlist() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-sm">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user ? (
          <div className="bg-gray-900/80 border border-purple-600/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">Please log in or sign up to access your watchlist.</h2>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition">Login</Link>
              <Link href="/signup" className="px-6 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition">Sign Up</Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 border border-purple-600/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
              Watchlist
            </h1>
            <p className="text-gray-500 text-lg">
              Track and monitor your favorite stocks in real-time.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}