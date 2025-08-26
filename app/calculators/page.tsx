// app/calculators/page.tsx
"use client";

import { useState } from "react";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState("BMI");
  const [results, setResults] = useState<any>(null);

  // BMI Calculator State
  const [bmiData, setBmiData] = useState({
    gender: "Male",
    age: "",
    weight: "",
    height: ""
  });

  // BMR Calculator State
  const [bmrData, setBmrData] = useState({
    gender: "Male",
    age: "",
    weight: "",
    height: ""
  });

  // Calorie Calculator State
  const [calorieData, setCalorieData] = useState({
    gender: "Male",
    age: "",
    weight: "",
    height: "",
    activity: "Moderate (exercise 3-5 days a week)"
  });

  // Ideal Weight Calculator State
  const [idealWeightData, setIdealWeightData] = useState({
    gender: "Male",
    height: ""
  });

  const activityLevels = [
    "Sedentary (little or no exercise)",
    "Lightly active (light exercise/sports 1-3 days a week)",
    "Moderate (exercise 3-5 days a week)",
    "Very active (hard exercise/sports 6-7 days a week)",
    "Extremely active (very hard exercise/sports & physical job)"
  ];

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // Convert cm to meters
    
    if (!weight || !height) return;
    
    const bmi = weight / (height * height);
    let category = "";
    
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    
    setResults({
      type: "BMI",
      value: bmi.toFixed(1),
      category: category,
      details: `A BMI of ${bmi.toFixed(1)} indicates that you are ${category.toLowerCase()}.`
    });
  };

  const calculateBMR = () => {
    const weight = parseFloat(bmrData.weight);
    const height = parseFloat(bmrData.height);
    const age = parseFloat(bmrData.age);
    
    if (!weight || !height || !age) return;
    
    let bmr;
    if (bmrData.gender === "Male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    setResults({
      type: "BMR",
      value: Math.round(bmr),
      details: `Your Basal Metabolic Rate (BMR) is ${Math.round(bmr)} calories per day. This is the number of calories your body needs to maintain basic functions at rest.`
    });
  };

  const calculateCalories = () => {
    const weight = parseFloat(calorieData.weight);
    const height = parseFloat(calorieData.height);
    const age = parseFloat(calorieData.age);
    
    if (!weight || !height || !age) return;
    
    let bmr;
    if (calorieData.gender === "Male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const activityMultipliers: { [key: string]: number } = {
      "Sedentary (little or no exercise)": 1.2,
      "Lightly active (light exercise/sports 1-3 days a week)": 1.375,
      "Moderate (exercise 3-5 days a week)": 1.55,
      "Very active (hard exercise/sports 6-7 days a week)": 1.725,
      "Extremely active (very hard exercise/sports & physical job)": 1.9
    };
    
    const tdee = bmr * activityMultipliers[calorieData.activity];
    
    setResults({
      type: "Calories",
      value: Math.round(tdee),
      details: `Based on your activity level, you need approximately ${Math.round(tdee)} calories per day to maintain your current weight.`,
      breakdown: {
        maintain: Math.round(tdee),
        mildLoss: Math.round(tdee - 250),
        weightLoss: Math.round(tdee - 500),
        extremeLoss: Math.round(tdee - 750),
        mildGain: Math.round(tdee + 250),
        weightGain: Math.round(tdee + 500),
        fastGain: Math.round(tdee + 750)
      }
    });
  };

  const calculateIdealWeight = () => {
    const height = parseFloat(idealWeightData.height);
    
    if (!height) return;
    
    // Using BMI range 18.5-24.9 for healthy weight
    const heightInMeters = height / 100;
    const minWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxWeight = 24.9 * (heightInMeters * heightInMeters);
    
    setResults({
      type: "Ideal Weight",
      range: `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`,
      details: `Based on a healthy BMI range (18.5-24.9), your ideal weight range is ${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg.`
    });
  };

  const resetForm = () => {
    setResults(null);
    if (activeTab === "BMI") {
      setBmiData({ gender: "Male", age: "", weight: "", height: "" });
    } else if (activeTab === "BMR") {
      setBmrData({ gender: "Male", age: "", weight: "", height: "" });
    } else if (activeTab === "Calorie Needs") {
      setCalorieData({ gender: "Male", age: "", weight: "", height: "", activity: "Moderate (exercise 3-5 days a week)" });
    } else if (activeTab === "Ideal Weight") {
      setIdealWeightData({ gender: "Male", height: "" });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "BMI":
        return (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Body Mass Index (BMI) Calculator
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              BMI is a measure of body fat based on height and weight that applies to adult men and women.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      checked={bmiData.gender === "Male"}
                      onChange={(e) => setBmiData({...bmiData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      checked={bmiData.gender === "Female"}
                      onChange={(e) => setBmiData({...bmiData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={bmiData.age}
                  onChange={(e) => setBmiData({...bmiData, age: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (Kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="Enter Height"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={calculateBMI}
                className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Calculate BMI
              </button>
            </div>
          </div>
        );

      case "BMR":
        return (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Basal Metabolic Rate (BMR) Calculator
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              BMR is the number of calories your body needs to maintain basic functions at rest.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      checked={bmrData.gender === "Male"}
                      onChange={(e) => setBmrData({...bmrData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      checked={bmrData.gender === "Female"}
                      onChange={(e) => setBmrData({...bmrData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={bmrData.age}
                  onChange={(e) => setBmrData({...bmrData, age: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (Kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    value={bmrData.weight}
                    onChange={(e) => setBmrData({...bmrData, weight: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="Enter Height"
                    value={bmrData.height}
                    onChange={(e) => setBmrData({...bmrData, height: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={calculateBMR}
                className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Calculate BMR
              </button>
            </div>
          </div>
        );

      case "Calorie Needs":
        return (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Daily Calorie Calculator
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Calculate your daily calorie needs based on your basal metabolic rate and activity level.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      checked={calorieData.gender === "Male"}
                      onChange={(e) => setCalorieData({...calorieData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      checked={calorieData.gender === "Female"}
                      onChange={(e) => setCalorieData({...calorieData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={calorieData.age}
                  onChange={(e) => setCalorieData({...calorieData, age: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (Kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    value={calorieData.weight}
                    onChange={(e) => setCalorieData({...calorieData, weight: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="Enter Height"
                    value={calorieData.height}
                    onChange={(e) => setCalorieData({...calorieData, height: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select
                  value={calorieData.activity}
                  onChange={(e) => setCalorieData({...calorieData, activity: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  {activityLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateCalories}
                className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Calculate Calories
              </button>
            </div>
          </div>
        );

      case "Ideal Weight":
        return (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Ideal Weight Calculator
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Calculate your ideal weight range based on your height and gender using the healthy BMI range.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      checked={idealWeightData.gender === "Male"}
                      onChange={(e) => setIdealWeightData({...idealWeightData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      checked={idealWeightData.gender === "Female"}
                      onChange={(e) => setIdealWeightData({...idealWeightData, gender: e.target.value})}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  placeholder="Enter Height"
                  value={idealWeightData.height}
                  onChange={(e) => setIdealWeightData({...idealWeightData, height: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={calculateIdealWeight}
                className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                Calculate Ideal Weight
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Results</h3>
        
        {results.type === "BMI" && (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 break-words">
              BMI: {results.value}
            </div>
            <div className="text-base sm:text-lg font-medium text-gray-700 break-words">
              Category: {results.category}
            </div>
            <p className="text-gray-600 text-sm sm:text-base break-words">{results.details}</p>
          </div>
        )}

        {results.type === "BMR" && (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 break-words">
              {results.value} calories/day
            </div>
            <p className="text-gray-600 text-sm sm:text-base break-words">{results.details}</p>
          </div>
        )}

        {results.type === "Calories" && (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 break-words">
              {results.value} calories/day
            </div>
            <p className="text-gray-600 text-sm sm:text-base break-words">{results.details}</p>
            
            {results.breakdown && (
              <div className="mt-4 sm:mt-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Calorie Goals:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Extreme weight loss:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.extremeLoss} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Weight loss:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.weightLoss} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Mild weight loss:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.mildLoss} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Maintain weight:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.maintain} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Mild weight gain:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.mildGain} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                    <span className="pr-2 break-words">Weight gain:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.weightGain} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="pr-2 break-words">Fast weight gain:</span>
                    <span className="font-medium whitespace-nowrap">{results.breakdown.fastGain} cal/day</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {results.type === "Ideal Weight" && (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 break-words">
              {results.range} kg
            </div>
            <p className="text-gray-600 text-sm sm:text-base break-words">{results.details}</p>
          </div>
        )}

        <button
          onClick={resetForm}
          className="mt-3 sm:mt-4 w-full sm:w-auto bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm sm:text-base"
        >
          Calculate Again
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Calculators</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track your health metrics with our simple calculators</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8 border-b overflow-x-auto">
          <div className="flex min-w-max sm:min-w-0">
            {["BMI Calculator", "BMR Calculator", "Calorie Needs", "Ideal Weight"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab.split(" ")[0] === "BMI" ? "BMI" : tab.split(" ")[0] === "BMR" ? "BMR" : tab === "Calorie Needs" ? "Calorie Needs" : "Ideal Weight");
                  setResults(null);
                }}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                  activeTab === (tab.split(" ")[0] === "BMI" ? "BMI" : tab.split(" ")[0] === "BMR" ? "BMR" : tab === "Calorie Needs" ? "Calorie Needs" : "Ideal Weight")
                    ? "text-purple-600 border-purple-600 bg-white"
                    : "text-gray-600 border-transparent bg-gray-200 hover:text-purple-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
        
        {/* Results */}
        {renderResults()}
      </div>
    </div>
  );
}