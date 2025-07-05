"use client";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return setError("Username required");
    login(username);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">Login to Stoxie</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition">Login</button>
        <p className="mt-4 text-center text-gray-400 text-sm">Don't have an account? <a href="/signup" className="text-purple-400 hover:underline">Sign up</a></p>
      </form>
    </div>
  );
} 