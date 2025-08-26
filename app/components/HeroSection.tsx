// app/components/HeroSection.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Kick-start your fitness journey today
            </h1>
            <p className="text-base sm:text-lg mb-6 opacity-90 px-2">
              Find the perfect trainer to help you achieve your fitness goals, whether in-person or online.
            </p>
          </div>
          
          {/* Mobile Image */}
          <div className="relative w-full max-w-sm mx-auto mb-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-image.jpg"
                alt="Fitness Training"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Mobile Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 px-4">
            <Link href="/trainers" className="flex-1">
              <button className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Find Trainers
              </button>
            </Link>
            <Link href="/calculators" className="flex-1">
              <button className="w-full border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300">
                Try Calculators
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop & Tablet Layout - Side by side */}
        <div className="hidden lg:flex items-center justify-between gap-8 xl:gap-12">
          <div className="flex-1 max-w-xl xl:max-w-2xl">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Kick-start your fitness journey today
            </h1>
            <p className="text-lg xl:text-xl mb-8 opacity-90 leading-relaxed">
              Find the perfect trainer to help you achieve your fitness goals, whether in-person or online.
            </p>
            <div className="flex gap-4">
              <Link href="/trainers">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Find Trainers
                </button>
              </Link>
              <Link href="/calculators">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Try Calculators
                </button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-end">
            <div className="relative w-80 xl:w-96 h-56 xl:h-64 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Fitness Training"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tablet Layout (md to lg) - Modified desktop layout */}
        <div className="hidden md:block lg:hidden">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 max-w-3xl">
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Kick-start your fitness journey today
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Find the perfect trainer to help you achieve your fitness goals, whether in-person or online.
              </p>
            </div>
            
            <div className="relative w-full max-w-lg mb-8">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Fitness Training"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link href="/trainers">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Find Trainers
                </button>
              </Link>
              <Link href="/calculators">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                  Try Calculators
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}