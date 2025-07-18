export default function FeatureCard({image, title, description}) {
    return (
      <div className="bg-gray-800/30 border border-purple-600/20 rounded-xl p-6 flex flex-col items-left text-left hover:bg-gray-800/50 hover:border-purple-600/40 transition-all duration-300 group">
        <img src={image} alt={title} className="w-16 h-16 mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-xl font-semibold text-purple-500 mb-3 group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-gray-500 group-hover:text-gray-400 transition-colors">{description}</p>
      </div>
    );
  }
  