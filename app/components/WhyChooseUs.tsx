// app/components/WhyChooseUs.tsx
export default function WhyChooseUs() {
  const features = [
    {
      icon: "👤",
      title: "Verified Trainers",
      description: "Every trainer on our platform is thoroughly vetted and certified.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: "💡",
      title: "Expert Content",
      description: "Access articles and tips written by fitness professionals.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: "📊",
      title: "Fitness Tools",
      description: "Use our calculators to track your health and fitness metrics.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Why choose DeepFitnessHub?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className={`text-2xl ${feature.iconColor}`}>
                  {feature.icon}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}