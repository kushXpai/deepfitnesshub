// app/components/LatestArticles.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function LatestArticles() {
  const articles = [
    {
      date: "Jun 12, 2025",
      title: "Marijuana Use Among Older Adults Hits Record High, Says NYU Study",
      excerpt: "A new analysis led by researchers at New York University's School of Global Public Health has found that marijuana use among older adults has reached a new \"high\" with 7% of adults aged 65 or over now taking a hit in the United States. While the demographics that are driving this record usage may come [@hellip;]",
      readTime: "4 min read",
      category: "News",
      categoryColor: "bg-red-500",
      image: "/images/article-1.jpg"
    },
    {
      date: "Jun 12, 2025",
      title: "4-Week Outdoor Workout Plan to Burn Fat and Build Muscle",
      excerpt: "Gym workouts are fantastic, and hitting the gym to chase pumps under fluorescent lights is where gains happen. However, if you've been stuck in the gym all winter and spring, it's time to think about taking your training outdoors and breathing a sweat in the sunshine and fresh air. This workout isn't just about burning [@hellip;]",
      readTime: "8 min read",
      category: "Workout Routines",
      categoryColor: "bg-purple-500",
      image: "/images/article-2.jpg"
    },
    {
      date: "Jun 11, 2025",
      title: "Nick Walker's Training For Olympia 2025: Weighted Tricep Dips",
      excerpt: "Nick Walker is on a mission to win the 2025 Mr Olympia, and in a recent Instagram post, \"The Mutant\" demonstrated some intense triceps dips as he forges his path to Las Vegas. The big man says that this is one of his favorite muscle-building moves, so here's how to try it for yourself. *Dips [@hellip;]",
      readTime: "3 min read",
      category: "Training",
      categoryColor: "bg-purple-600",
      image: "/images/article-3.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Latest Fitness Articles
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <span className={`absolute top-4 left-4 ${article.categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {article.category}
                </span>
              </div>
              
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    vkfm • {article.readTime}
                  </span>
                  <Link href="/blogs" className="text-purple-600 font-medium hover:text-purple-700 transition">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/trainers">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              See more articles
            </button>
          </Link>    
        </div>
      </div>
    </section>
  );
}