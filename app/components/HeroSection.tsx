// app/components/HeroSection.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Kick-start your fitness journey today
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find the perfect trainer to help you achieve your fitness goals, whether in-person or online.
          </p>
          <div className="flex space-x-4">
            <Link href="/trainers">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Find Trainers
              </button>
            </Link>
            <Link href="/calculators">
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                Try Calculators
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="relative w-96 h-64 rounded-2xl overflow-hidden">
            {/* Replace with your actual image path */}
            <Image
              src="/images/hero-image.jpg"
              alt="Fitness Training"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}