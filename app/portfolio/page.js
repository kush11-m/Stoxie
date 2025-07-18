"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from '../components/AuthProvider';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  // Add a state for which stock is in 'sell mode'
  const [sellingSymbol, setSellingSymbol] = useState(null);
  const [sellQuantities, setSellQuantities] = useState({});

  // Load portfolio from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stoxie_portfolio");
      setPortfolio(stored ? JSON.parse(stored) : []);
    }
  }, []);

  // Remove or update stock in portfolio (sell)
  const handleSell = (stock) => {
    setSellingSymbol(stock.symbol);
    setSellQuantities(q => ({ ...q, [stock.symbol]: "1" }));
  };
  const handleConfirmSell = (stock) => {
    const sharesToSell = parseInt(sellQuantities[stock.symbol] || "1", 10);
    if (isNaN(sharesToSell) || sharesToSell <= 0 || sharesToSell > stock.shares) return;
    if (sharesToSell === stock.shares) {
      // Remove stock from portfolio
      const updated = portfolio.filter(s => s.symbol !== stock.symbol);
      setPortfolio(updated);
      localStorage.setItem("stoxie_portfolio", JSON.stringify(updated));
    } else {
      // Update shares and keep average purchase price
      const updated = portfolio.map(s =>
        s.symbol === stock.symbol
          ? { ...s, shares: s.shares - sharesToSell }
          : s
      );
      setPortfolio(updated);
      localStorage.setItem("stoxie_portfolio", JSON.stringify(updated));
    }
    setSellQuantities(q => ({ ...q, [stock.symbol]: "" }));
    setSellingSymbol(null);
  };
  const handleCancelSell = () => setSellingSymbol(null);

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-sm">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user ? (
          <div className="bg-gray-900/80 border border-purple-600/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">Please log in or sign up to access your portfolio.</h2>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition">Login</Link>
              <Link href="/signup" className="px-6 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition">Sign Up</Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 border border-purple-600/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
              Portfolio
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Analyze your investments and track your portfolio performance.
            </p>
            {portfolio.length === 0 ? (
              <div className="text-gray-400 text-center">You have not bought any stocks yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {portfolio.map(stock => {
                  const growth = (stock.price - stock.purchasePrice) * stock.shares;
                  const growthPercent = (((stock.price - stock.purchasePrice) / stock.purchasePrice) * 100).toFixed(2);
                  const currentValue = stock.price * stock.shares;
                  const invested = stock.purchasePrice * stock.shares;
                  return (
                    <div key={stock.symbol} className="bg-gray-900/80 border border-purple-600/20 rounded-lg p-6 text-center">
                      <img src={stock.graph} alt={stock.symbol + " graph"} className="w-full h-32 object-contain mb-3 rounded bg-gray-800" />
                      <h2 className="text-xl font-semibold text-purple-500 mb-2">{stock.symbol}</h2>
                      <div className="text-gray-400 text-sm mb-2">{stock.name}</div>
                      <div className="text-2xl text-gray-200 font-bold mb-1">₹{stock.price}</div>
                      <div className={growth >= 0 ? "text-green-400" : "text-red-400"}>
                        {growth >= 0 ? "+" : ""}{growth.toFixed(2)} ({growthPercent}%)
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        Shares: {stock.shares}<br />
                        Invested: ₹{invested.toFixed(2)}<br />
                        Current Value: ₹{currentValue.toFixed(2)}<br />
                        Bought at ₹{stock.purchasePrice.toFixed(2)} on {new Date(stock.purchaseDate).toLocaleDateString()}
                      </div>
                      {sellingSymbol === stock.symbol ? (
                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/80 border border-purple-700 shadow-md">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              max={stock.shares}
                              value={sellQuantities[stock.symbol] || ""}
                              onChange={e => setSellQuantities(q => ({ ...q, [stock.symbol]: e.target.value }))}
                              placeholder="Qty"
                              className="w-20 px-3 py-2 rounded-lg bg-gray-900 text-gray-200 border border-purple-700 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                            <button
                              onClick={() => handleConfirmSell(stock)}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition disabled:opacity-50 shadow"
                              disabled={!sellQuantities[stock.symbol] || parseInt(sellQuantities[stock.symbol], 10) <= 0 || parseInt(sellQuantities[stock.symbol], 10) > stock.shares}
                            >
                              Confirm Sell
                            </button>
                            <button
                              onClick={handleCancelSell}
                              className="px-3 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSell(stock)}
                          className="mt-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition font-semibold"
                        >
                          Sell
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}