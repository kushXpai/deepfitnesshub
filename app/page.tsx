// app/page.tsx
import HeroSection from './components/HeroSection';
import FeaturedTrainers from './components/FeaturedTrainers';
import WhyChooseUs from './components/WhyChooseUs';
import LatestArticles from './components/LatestArticles';
import FitnessCalculators from './components/FitnessCalculators';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedTrainers />
      <WhyChooseUs />
      <LatestArticles />
      <FitnessCalculators />
    </div>
  );
}