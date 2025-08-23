// app/components/FeaturedTrainers.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedTrainers() {
  const trainers = [
    {
      name: "Nirvana Arts Studio",
      location: "Ahmedabad",
      rating: "N/A",
      tags: ["yoga"],
      online: false
    },
    {
      name: "Vandana",
      location: "Delhi",
      rating: "N/A",
      tags: ["weight loss", "yoga"],
      online: false
    },
    {
      name: "Kaushik Bose",
      location: "Kolkata",
      rating: "N/A",
      tags: ["personal training", "weight loss", "fat loss", "..."],
      online: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Featured Trainers</h2>
          <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
            <span className="mr-2">📍</span>
            Change location
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {trainers.map((trainer, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition relative">
              {trainer.online && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Online
                </span>
              )}
              
              {/* Profile Image Placeholder */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-800 rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {trainer.name}
              </h3>
              
              <p className="text-gray-600 text-center mb-4 flex items-center justify-center">
                <span className="mr-1">📍</span>
                {trainer.location}
              </p>
              
              <div className="flex justify-center mb-4">
                <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ {trainer.rating}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {trainer.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/trainers">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Show more trainers
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}