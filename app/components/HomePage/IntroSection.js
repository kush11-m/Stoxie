export default function IntroSection() {
    return (
      <section className="w-full flex items-center justify-center text-center py-32 px-4 bg-black/95 backdrop-blur-sm">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">
            Stock Market Investing
          </h2>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Your gateway to intelligent investing. Track, analyze, and grow your portfolio with real-time market insights.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/20">
              Dashboard
            </button>
            <button className="px-8 py-3 border border-purple-600/30 text-purple-500 rounded-lg hover:bg-purple-600/10 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </section>
    );
}
  