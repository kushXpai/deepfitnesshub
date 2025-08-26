// components/TrainerCard.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface TrainerCardData {
  id: number;
  name: string;
  image: string; // URL or filename or "Not Available"
  location: string;
  rating?: string | number;
  is_online?: boolean;
  badges?: string[];
  specializations?: string[];
}

const getTrainerImageUrl = (image: string, trainerName: string): string => {
  if (!image || image === "Not Available") {
    return trainerName &&
      trainerName !== "Not Available" &&
      !trainerName.toUpperCase().includes("FITNESS")
      ? "https://deepfitnesshub.com/beta/images/trainers/default-trainer-1.jpg"
      : "https://deepfitnesshub.com/beta/images/trainers/default-gym.jpg";
  }
  if (image.startsWith("http")) return image;
  return `/images/trainers/${image}`;
};

const TrainerCard: React.FC<{ trainer: TrainerCardData }> = ({ trainer }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    name = "Unknown Gym",
    location = "Location not specified",
    rating = "N/A",
    is_online,
    badges = [],
    specializations = [],
    image,
  } = trainer;

  const imgUrl = getTrainerImageUrl(image, name);
  const fallbackIsPerson =
    name && name !== "Not Available" && !name.toUpperCase().includes("FITNESS");

  const badgeMap: Record<string, string> = {
    online: "bg-green-600",
    "top rated": "bg-purple-600",
    expert: "bg-blue-600",
    "nutrition coach": "bg-orange-600",
    "yoga expert": "bg-pink-600",
    "crossfit expert": "bg-red-600",
    "pilates expert": "bg-indigo-600",
    "martial arts master": "bg-gray-700",
    "self defense": "bg-yellow-600",
    "dance fitness": "bg-pink-500",
    "swimming expert": "bg-cyan-600",
  };

  return (
    <Link
      href={`/trainers/profile/${id}`}
      className={`group rounded-3xl shadow-lg bg-white overflow-hidden transition-all duration-300 border border-gray-100 block relative
        hover:shadow-2xl hover:-translate-y-2
        active:scale-95 active:shadow-md
        ${isPressed ? 'scale-95 shadow-md' : ''}
        animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0`}
      style={{
        animationDelay: `${Math.random() * 0.3}s`
      }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Subtle pulse animation for mobile tap feedback */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-active:opacity-10 transition-opacity duration-150 pointer-events-none" />
      
      <div className="relative overflow-hidden">
        {/* Loading skeleton */}
        <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        
        <img
          src={imgUrl}
          alt={name}
          className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = fallbackIsPerson
              ? "https://deepfitnesshub.com/beta/images/trainers/default-trainer-1.jpg"
              : "https://deepfitnesshub.com/beta/images/trainers/default-gym.jpg";
            setImageLoaded(true);
          }}
        />
        
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating badges with stagger animation */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 max-w-32">
          {is_online ? (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full animate-[slideInRight_0.5s_ease-out] shadow-lg">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </span>
          ) : null}
          {badges.map((b, i) => {
            const cls = badgeMap[b.toLowerCase?.()] || "bg-purple-600";
            return (
              <span
                key={i}
                className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${cls} shadow-lg animate-[slideInRight_0.5s_ease-out] hover:scale-105 transition-transform duration-200`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {b}
              </span>
            );
          })}
        </div>
      </div>

      <div className="p-6 relative">
        {/* Subtle background animation on mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-blue-50/0 group-active:from-purple-50/30 group-active:to-blue-50/30 transition-all duration-200 rounded-b-3xl" />
        
        <div className="mb-3 flex items-start justify-between relative z-10">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-300 mb-1 animate-[slideInLeft_0.6s_ease-out] truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center animate-[slideInLeft_0.6s_ease-out_0.1s_both]">
              <svg className="w-4 h-4 mr-1 flex-shrink-0 group-hover:text-purple-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 006 0z"
                />
              </svg>
              <span className="truncate">{location}</span>
            </p>
          </div>
          
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-md ml-3 group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 animate-[slideInRight_0.6s_ease-out_0.2s_both] flex-shrink-0">
            <svg className="w-4 h-4 mr-1 animate-[spin_2s_linear_infinite] group-hover:animate-none" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating === "Not Available" ? "N/A" : rating}
          </div>
        </div>

        {specializations.length && !specializations.includes("Not Available") ? (
          <div className="mb-4 flex flex-wrap gap-1 animate-[slideInUp_0.6s_ease-out_0.3s_both]">
            {specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full inline-block transition-all duration-200 hover:bg-blue-200 hover:scale-105 animate-[slideInUp_0.4s_ease-out] shadow-sm"
                style={{ animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'both' }}
              >
                {spec}
              </span>
            ))}
            {specializations.length > 3 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full inline-block transition-all duration-200 hover:bg-blue-200 hover:scale-105 animate-[slideInUp_0.4s_ease-out_0.7s_both] shadow-sm">
                +{specializations.length - 3}
              </span>
            )}
          </div>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
};

export default TrainerCard;