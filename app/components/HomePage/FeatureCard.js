export default function FeatureCard({image, title, description}) {
    return (
      <div className="bg-black border border-purple-800 rounded-xl shadow-md p-6 flex flex-col items-left text-left">
        <img src={image} alt={title} className="w-16 h-16 mb-4" />
        <h3 className="text-lg font-semibold text-white-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
  }
  