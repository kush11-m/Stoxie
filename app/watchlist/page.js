import Footer from "../components/HomePage/Footer";
import Header from "../components/HomePage/Header";

export default function Watchlist() {
    return (
      <div className="min-h-screen bg-black/95 backdrop-blur-sm">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800/30 border border-purple-600/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
              Watchlist
            </h1>
            <p className="text-gray-500 text-lg">
              Track and monitor your favorite stocks in real-time.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }