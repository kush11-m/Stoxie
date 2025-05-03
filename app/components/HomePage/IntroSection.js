export default function IntroSection() {
    return (
      <section className="w-full flex items-center justify-center text-center py-24 px-4 bg-black-50">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-black-800 mb-4">
            Stock Market Investing
          </h2>
          <p className="text-lg text-black-600 mb-8">
            Description here...
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
              Dashboard
            </button>
            <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>
    );
}
  