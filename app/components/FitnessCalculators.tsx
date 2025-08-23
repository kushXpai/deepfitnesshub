// app/components/FitnessCalculators.tsx
import Link from 'next/link';

export default function FitnessCalculators() {
  const calculators = [
    {
      icon: "⚖️",
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-100"
    },
    {
      icon: "🔥",
      title: "BMR Calculator",
      description: "Calculate your Basal Metabolic Rate",
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-100"
    },
    {
      icon: "🍎",
      title: "Calorie Calculator",
      description: "Calculate your Daily Caloric Needs",
      bgColor: "bg-red-100",
      iconBg: "bg-red-100"
    },
    {
      icon: "🎯",
      title: "Ideal Weight",
      description: "Calculate your Ideal Body Weight",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Fitness Calculators
          </h2>
          <p className="text-gray-600 text-lg">
            Track your health metrics with our comprehensive collection of fitness calculators
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {calculators.map((calculator, index) => (
            <Link key={index} href="/calculators">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-purple-300 cursor-pointer">
                <div className={`w-16 h-16 ${calculator.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">
                    {calculator.icon}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {calculator.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {calculator.description}
                </p>
                
                <div className="mt-4">
                  <span className="text-purple-600 font-medium">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}