import FeatureCard from './FeatureCard';
import { featuresData } from '../../assets/HomePage/featuresData';

export default function FeaturesSection() {
  return (
    <section className="px-4 py-24 bg-black/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent text-center mb-16">
          Powerful Features for Smart Investing
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
