"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from '../components/AuthProvider';
import Link from "next/link";
import { useState } from "react";

const mockStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2850.5, change: 12.1, changesPercentage: 0.43, graph: "https://charts2.finviz.com/chart.ashx?t=RELIANCE&ty=c&ta=1&p=d&s=l" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3750.2, change: -15.3, changesPercentage: -0.41, graph: "https://charts2.finviz.com/chart.ashx?t=TCS&ty=c&ta=1&p=d&s=l" },
  { symbol: "INFY", name: "Infosys", price: 1450.1, change: 5.2, changesPercentage: 0.36, graph: "https://charts2.finviz.com/chart.ashx?t=INFY&ty=c&ta=1&p=d&s=l" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1700.0, change: 10.0, changesPercentage: 0.59, graph: "https://charts2.finviz.com/chart.ashx?t=HDB&ty=c&ta=1&p=d&s=l" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 950.0, change: -8.0, changesPercentage: -0.84, graph: "https://charts2.finviz.com/chart.ashx?t=IBN&ty=c&ta=1&p=d&s=l" },
];

function sortByReturn(stocks) {
  return [...stocks].sort((a, b) => b.changesPercentage - a.changesPercentage);
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem("stoxie_watchlist") || "[]"));
  const [portfolio, setPortfolio] = useState(() => JSON.parse(localStorage.getItem("stoxie_portfolio") || "[]"));
  const [buying, setBuying] = useState(null);
  const [qty, setQty] = useState("");
  const [msg, setMsg] = useState("");

  const stocks = sortByReturn(
    mockStocks.filter(s =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  function addToWatchlist(stock) {
    if (!watchlist.some(s => s.symbol === stock.symbol)) {
      const updated = [...watchlist, stock];
      setWatchlist(updated);
      localStorage.setItem("stoxie_watchlist", JSON.stringify(updated));
    }
  }

  function startBuy(symbol) {
    setBuying(symbol);
    setQty("1");
  }

  function confirmBuy(stock) {
    const shares = parseInt(qty, 10);
    if (!shares || shares <= 0) return;
    let updated;
    const idx = portfolio.findIndex(s => s.symbol === stock.symbol);
    if (idx > -1) {
      const p = portfolio[idx];
      const totalShares = p.shares + shares;
      const avgPrice = ((p.purchasePrice * p.shares) + (stock.price * shares)) / totalShares;
      updated = [...portfolio];
      updated[idx] = { ...p, shares: totalShares, purchasePrice: avgPrice, purchaseDate: new Date().toISOString() };
    } else {
      updated = [...portfolio, { ...stock, purchasePrice: stock.price, purchaseDate: new Date().toISOString(), shares }];
    }
    setPortfolio(updated);
    localStorage.setItem("stoxie_portfolio", JSON.stringify(updated));
    setMsg(`You bought ${shares} share${shares > 1 ? 's' : ''} of ${stock.symbol}!`);
    setTimeout(() => setMsg(""), 2000);
    setBuying(null);
    setQty("");
  }

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-sm">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user ? (
          <div className="bg-gray-900/80 border border-purple-600/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">Please log in or sign up to access your dashboard.</h2>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition">Login</Link>
              <Link href="/signup" className="px-6 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition">Sign Up</Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 border border-purple-600/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">Dashboard</h1>
            <input
              type="text"
              placeholder="Search stocks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mb-6 px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-md"
            />
            {msg && <div className="text-green-400 mb-4">{msg}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stocks.map(stock => {
                const inWatchlist = watchlist.some(s => s.symbol === stock.symbol);
                const inPortfolio = portfolio.some(s => s.symbol === stock.symbol);
                return (
                  <div key={stock.symbol} className="bg-gray-900/80 border border-purple-600/20 rounded-lg p-6 text-center hover:border-purple-400 transition">
                    <img src={stock.graph} alt={stock.symbol + " graph"} className="w-full h-32 object-contain mb-3 rounded bg-gray-800" />
                    <h2 className="text-xl font-semibold text-purple-500 mb-2">{stock.symbol}</h2>
                    <div className="text-gray-400 text-sm mb-2">{stock.name}</div>
                    <div className="text-2xl text-gray-200 font-bold mb-1">₹{stock.price}</div>
                    <div className={stock.change >= 0 ? "text-green-400" : "text-red-400"}>{stock.change >= 0 ? "+" : ""}{stock.change} ({stock.changesPercentage}%)</div>
                    <div className="flex flex-col gap-2 mt-4">
                      {buying === stock.symbol ? (
                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/80 border border-purple-700 shadow-md">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={qty}
                              onChange={e => setQty(e.target.value)}
                              placeholder="Qty"
                              className="w-20 px-3 py-2 rounded-lg bg-gray-900 text-gray-200 border border-purple-700 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                            <button
                              onClick={() => confirmBuy(stock)}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition disabled:opacity-50 shadow"
                              disabled={!qty || parseInt(qty, 10) <= 0}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setBuying(null)}
                              className="px-3 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => startBuy(stock.symbol)}
                          className="px-4 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition disabled:opacity-50 font-semibold"
                          disabled={inPortfolio}
                        >
                          {inPortfolio ? "In Portfolio" : "Buy"}
                        </button>
                      )}
                      <button
                        onClick={() => addToWatchlist(stock)}
                        className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition disabled:opacity-50 font-semibold"
                        disabled={inWatchlist}
                      >
                        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Portfolio display */}
            {portfolio.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Your Portfolio</h3>
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
                        <div className={growth >= 0 ? "text-green-400" : "text-red-400"}>{growth >= 0 ? "+" : ""}{growth.toFixed(2)} ({growthPercent}%)</div>
                        <div className="text-xs text-gray-500 mb-2">
                          Shares: {stock.shares}<br />
                          Invested: ₹{invested.toFixed(2)}<br />
                          Current Value: ₹{currentValue.toFixed(2)}<br />
                          Bought at ₹{stock.purchasePrice.toFixed(2)} on {new Date(stock.purchaseDate).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => setPortfolio(portfolio.filter(s => s.symbol !== stock.symbol))}
                          className="mt-2 px-4 py-2 rounded-lg border border-purple-600 text-purple-500 hover:bg-purple-600/10 transition"
                        >
                          Sell
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}