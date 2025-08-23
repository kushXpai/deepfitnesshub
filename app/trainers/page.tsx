// app/trainers/page.tsx
"use client";

import React, { useState } from 'react';

export default function TrainersPage() {
  const [searchName, setSearchName] = useState('');
  const [trainingType, setTrainingType] = useState('All Types');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trainingTypes = [
    'All Types',
    'Personal Training',
    'Weight Loss',
    'Yoga'
  ];

  const trainers = [
    {
      id: 1,
      name: 'ACSM Certified Personal Fitness Trainer in Kolkata',
      location: 'Mumbai',
      rating: 'N/A',
      image: '/gym-icon',
      tags: ['personal training', 'weight loss', 'strength training'],
      isGym: true
    },
    {
      id: 2,
      name: 'Liger Gym',
      location: 'Kolkata',
      rating: 'N/A',
      image: '/trainer-profile',
      tags: ['cardio', 'yoga', 'zumba'],
      isGym: false
    },
    {
      id: 3,
      name: 'Certified Yoga Instructor in Kolkata',
      location: 'Kolkata',
      rating: 'N/A',
      image: '/trainer-profile',
      tags: ['yoga'],
      isGym: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Trainer
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Discover expert fitness trainers tailored to your goals, whether it's weight loss,
            strength training, or overall wellness.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search by Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Enter trainer name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Training Type Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Type
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent flex justify-between items-center"
                >
                  <span>{trainingType}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                    {trainingTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTrainingType(type);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Online Only Checkbox */}
            <div className="flex items-end pb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={onlineOnly}
                  onChange={(e) => setOnlineOnly(e.target.checked)}
                  className="mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Online Only</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Apply Filters
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Trainer Image/Icon */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {trainer.isGym ? (
                  <div className="text-center">
                    <div className="bg-black text-white rounded-t-lg px-8 py-4 mx-8">
                      <div className="text-2xl font-bold">GYM</div>
                      <div className="flex justify-center space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-3 h-8 bg-gray-400"></div>
                        ))}
                      </div>
                      <div className="w-6 h-3 bg-gray-400 mx-auto mt-2"></div>
                    </div>
                    <div className="bg-black h-4 mx-8"></div>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-black rounded-full"></div>
                )}
              </div>

              {/* Trainer Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {trainer.name}
                  </h3>
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-medium ml-2">
                    ★ {trainer.rating}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {trainer.location}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {trainer.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {trainer.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      ...
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}