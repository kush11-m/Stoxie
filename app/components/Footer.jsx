import FooterColumn from "./FooterColumn";
import { footerData } from '../assets/HomePage/footerData.js';

export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-sm text-gray-400 py-16 px-6 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        {footerData.map((col, idx) => (
          <FooterColumn key={idx} title={col.title} items={col.items} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-800/50 pt-8 text-center text-sm space-y-3">
        <p className="text-gray-500">Stoxie © 2025 | Data provided for educational purposes only</p>
        <p className="text-gray-600">Not financial advice. Trading involves risk.</p>
      </div>
    </footer>
  );
}
