// components/TrainerCard.tsx
"use client";

import React from "react";
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
      className="group rounded-3xl shadow-lg bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 block"
    >
      <div className="relative overflow-hidden">
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = fallbackIsPerson
              ? "https://deepfitnesshub.com/beta/images/trainers/default-trainer-1.jpg"
              : "https://deepfitnesshub.com/beta/images/trainers/default-gym.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-32">
          {is_online ? (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Online
            </span>
          ) : null}
          {badges.map((b, i) => {
            const cls = badgeMap[b.toLowerCase?.()] || "bg-purple-600";
            return (
              <span
                key={i}
                className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${cls}`}
              >
                {b}
              </span>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {location}
            </p>
          </div>
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-md">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating === "Not Available" ? "N/A" : rating}
          </div>
        </div>

        {specializations.length && !specializations.includes("Not Available") ? (
          <div className="mb-4 flex flex-wrap gap-1">
            {specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-1 mb-1 inline-block"
              >
                {spec}
              </span>
            ))}
            {specializations.length > 3 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-1 mb-1 inline-block">
                ...
              </span>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default TrainerCard;
