"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from '../components/AuthProvider';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Watchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  // Add a state for which stock is in 'buy mode'
  const [buyingSymbol, setBuyingSymbol] = useState(null);
  const [buyQuantities, setBuyQuantities] = useState({});

  // Load watchlist and portfolio from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stoxie_watchlist");
      setWatchlist(stored ? JSON.parse(stored) : []);
      const storedPortfolio = localStorage.getItem("stoxie_portfolio");
      setPortfolio(storedPortfolio ? JSON.parse(storedPortfolio) : []);
    }
  }, []);

  // Remove stock from watchlist
  const handleRemove = (symbol) => {
    const updated = watchlist.filter(s => s.symbol !== symbol);
    setWatchlist(updated);
    localStorage.setItem("stoxie_watchlist", JSON.stringify(updated));
  };

  // Buy stock from watchlist
  const handleBuy = (stock) => {
    setBuyingSymbol(stock.symbol);
    setBuyQuantities(q => ({ ...q, [stock.symbol]: "1" }));
  };
  const handleConfirmBuy = (stock) => {
    const shares = parseInt(buyQuantities[stock.symbol] || "1", 10);
    if (isNaN(shares) || shares <= 0) return;
    const existing = portfolio.find(s => s.symbol === stock.symbol);
    if (existing) {
      // Accumulate shares and update average purchase price
      const totalShares = existing.shares + shares;
      const totalCost = (existing.purchasePrice * existing.shares) + (stock.price * shares);
      const avgPrice = totalCost / totalShares;
      const updatedPortfolio = portfolio.map(s =>
        s.symbol === stock.symbol
          ? { ...s, shares: totalShares, purchasePrice: avgPrice, purchaseDate: new Date().toISOString() }
          : s
      );
      setPortfolio(updatedPortfolio);
      localStorage.setItem("stoxie_portfolio", JSON.stringify(updatedPortfolio));
    } else {
      const updatedPortfolio = [
        ...portfolio,
        {
          ...stock,
          purchasePrice: stock.price,
          purchaseDate: new Date().toISOString(),
          shares
        }
      ];
      setPortfolio(updatedPortfolio);
      localStorage.setItem("stoxie_portfolio", JSON.stringify(updatedPortfolio));
    }
    setBuyQuantities(q => ({ ...q, [stock.symbol]: "" }));
    setBuyingSymbol(null);
  };
  const handleCancelBuy = () => setBuyingSymbol(null);

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
            <p className="text-gray-500 text-lg mb-8">
              Track and monitor your favorite stocks in real-time.
            </p>
            {watchlist.length === 0 ? (
              <div className="text-gray-400 text-center">You have not added any stocks to your watchlist yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {watchlist.map(stock => {
                  const inPortfolio = portfolio.some(s => s.symbol === stock.symbol);
                  return (
                    <div key={stock.symbol} className="bg-gray-900/80 border border-purple-600/20 rounded-lg p-6 text-center">
                      <img src={stock.graph} alt={stock.symbol + " graph"} className="w-full h-32 object-contain mb-3 rounded bg-gray-800" />
                      <h2 className="text-xl font-semibold text-purple-500 mb-2">{stock.symbol}</h2>
                      <div className="text-gray-400 text-sm mb-2">{stock.name}</div>
                      <div className="text-2xl text-gray-200 font-bold mb-1">₹{stock.price}</div>
                      <div className={stock.change >= 0 ? "text-green-400" : "text-red-400"}>
                        {stock.change >= 0 ? "+" : ""}{stock.change} ({stock.changesPercentage}%)
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        {buyingSymbol === stock.symbol ? (
                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/80 border border-purple-700 shadow-md">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                value={buyQuantities[stock.symbol] || ""}
                                onChange={e => setBuyQuantities(q => ({ ...q, [stock.symbol]: e.target.value }))}
                                placeholder="Qty"
                                className="w-20 px-3 py-2 rounded-lg bg-gray-900 text-gray-200 border border-purple-700 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                              />
                              <button
                                onClick={() => handleConfirmBuy(stock)}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition disabled:opacity-50 shadow"
                                disabled={!buyQuantities[stock.symbol] || parseInt(buyQuantities[stock.symbol], 10) <= 0}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={handleCancelBuy}
                                className="px-3 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleBuy(stock)}
                            className="px-4 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition disabled:opacity-50 font-semibold"
                            disabled={inPortfolio}
                          >
                            {inPortfolio ? "In Portfolio" : "Buy"}
                          </button>
                        )}
                        <button
                          onClick={() => handleRemove(stock.symbol)}
                          className="px-4 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition font-semibold"
                        >
                          Remove
                        </button>
                      </div>
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