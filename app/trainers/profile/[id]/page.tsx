// app/trainers/profile/[id]/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Spec = { name: string; description?: string };
type Cert = { name: string; description?: string };
type Badge = { name: string };

interface TrainerDetail {
  id: number;
  name: string;
  is_gym: boolean;
  image: string;
  location: string;
  rating: string | number;
  caption_snippet: string;
  experience: string;
  email: string;
  phone: string;
  instagram: string;
  price_per_session: number | string | null;
  is_online: boolean;
  specializations: Spec[];
  badges: Badge[];
  certifications: Cert[];
}

const fallbackImage = (name: string, isGym: boolean) =>
  isGym
    ? "https://deepfitnesshub.com/beta/images/trainers/default-gym.jpg"
    : "https://deepfitnesshub.com/beta/images/trainers/default-trainer-1.jpg";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [trainer, setTrainer] = useState<TrainerDetail | null>(null);
  const [tab, setTab] = useState<"about" | "services" | "gallery" | "certifications">("about");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/trainers/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (json?.error) {
          router.push("/trainers");
          return;
        }
        setTrainer(json as TrainerDetail);
      } catch (e) {
        console.error(e);
        router.push("/trainers");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const pricing = useMemo(() => {
    const p = Number(trainer?.price_per_session);
    if (!p || Number.isNaN(p)) return null;
    return {
      per: p,
      pack5: Math.round(p * 5 * 0.95),
      pack10: Math.round(p * 10 * 0.9),
    };
  }, [trainer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  if (!trainer) return null;

  const isGym = !!trainer.is_gym;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-16">
          {/* Mobile Back Button */}
          <button
            onClick={() => router.push("/trainers")}
            className="mb-6 flex items-center text-white/80 hover:text-white transition-colors duration-200 animate-[slideInLeft_0.6s_ease-out]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Trainers
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            {/* Profile Image with Animation */}
            <div className="relative animate-[bounceIn_0.8s_ease-out]">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white relative">
                {/* Loading skeleton */}
                <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
                
                <img
                  src={
                    trainer.image && trainer.image !== "Not Available"
                      ? (String(trainer.image).startsWith("http")
                          ? trainer.image
                          : `/images/trainers/${trainer.image}`)
                      : fallbackImage(trainer.name, isGym)
                  }
                  alt={trainer.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.onerror = null;
                    t.src = fallbackImage(trainer.name, isGym);
                    setImageLoaded(true);
                  }}
                />
              </div>
              {trainer.is_online && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  <span className="inline-block w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                  Online
                </div>
              )}
            </div>

            {/* Name and Details */}
            <div className="space-y-4 max-w-sm sm:max-w-md">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white animate-[slideInUp_0.6s_ease-out_0.2s_both] break-words">
                {trainer.name}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-3 animate-[slideInUp_0.6s_ease-out_0.4s_both]">
                <span className="bg-purple-500/80 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {isGym ? "Fitness Facility" : "Personal Trainer"}
                </span>
                <span className="text-white/90 text-lg font-medium">{trainer.location}</span>
              </div>
              
              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full animate-[slideInUp_0.6s_ease-out_0.6s_both]">
                <div className="flex items-center bg-yellow-400 text-white font-bold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {trainer.rating === "Not Available" ? "N/A" : trainer.rating} Rating
                </div>
                
                <button
                  className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
                  onClick={() => {
                    const anchor = document.getElementById("contact-card");
                    anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Contact Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body - Mobile First Layout */}
      <div className="px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Mobile-Optimized Tabs */}
              <div className="bg-white rounded-2xl shadow-lg p-1 mb-6 animate-[slideInUp_0.6s_ease-out]">
                <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  {(["about", "services", "gallery", "certifications"] as const).map((t, index) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 ${
                        tab === t
                          ? "bg-purple-600 text-white shadow-lg"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {t[0].toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-[slideInUp_0.6s_ease-out_0.2s_both]">
                {tab === "about" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">About {trainer.name}</h2>
                      <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                        <p>{trainer.caption_snippet || "Not Available"}</p>
                        {!isGym && trainer.experience && trainer.experience !== "Not Available" ? (
                          <p className="mt-4">
                            Offering {trainer.experience} of experience in delivering personalized
                            fitness programs and expert guidance.
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {trainer.specializations?.length ? (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Specializations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {trainer.specializations.map((s, i) => (
                            <div
                              key={i}
                              className="bg-purple-50 border border-purple-200 text-purple-800 px-4 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-colors duration-200 animate-[slideInUp_0.4s_ease-out]"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            >
                              {s.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {trainer.badges?.length ? (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements & Badges</h3>
                        <div className="flex flex-wrap gap-2">
                          {trainer.badges.map((b, i) => {
                            const map: Record<string, string> = {
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
                            const cls = map[b.name.toLowerCase?.()] || "bg-purple-600";
                            return (
                              <span
                                key={i}
                                className={`text-white text-sm font-semibold px-4 py-2 rounded-full ${cls} shadow-lg hover:scale-105 transition-transform duration-200 animate-[slideInUp_0.4s_ease-out]`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                              >
                                {b.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                        <p className="text-gray-700 text-lg font-semibold bg-gray-50 p-4 rounded-xl">
                          {trainer.experience}
                        </p>
                      </div>
                      <div className="animate-[slideInRight_0.6s_ease-out_0.6s_both]">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
                        {trainer.certifications?.length ? (
                          <ul className="space-y-2">
                            {trainer.certifications.map((c, i) => (
                              <li key={i} className="flex items-center text-gray-700 bg-green-50 p-3 rounded-lg">
                                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-sm">{c.name}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">Not Available</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {tab === "services" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Services</h2>
                    {trainer.specializations?.length ? (
                      <div className="grid grid-cols-1 gap-4">
                        {trainer.specializations.map((s, i) => (
                          <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all duration-300 animate-[slideInUp_0.4s_ease-out]"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{s.name}</h3>
                            <p className="text-gray-600 mb-4">
                              {s.description || `Professional ${s.name.toLowerCase()} training tailored to your fitness level and goals.`}
                            </p>
                            {pricing ? (
                              <div className="text-purple-600 font-bold text-lg">₹{pricing.per}/session</div>
                            ) : (
                              <div className="text-gray-400 font-semibold">Pricing on request</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">Specialized training services available. Contact for details.</p>
                      </div>
                    )}
                  </div>
                )}

                {tab === "gallery" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                          key={num}
                          className="relative rounded-xl overflow-hidden group cursor-pointer animate-[slideInUp_0.4s_ease-out]"
                          style={{ animationDelay: `${num * 0.1}s` }}
                        >
                          <img
                            src={`/images/trainers/gallery-${((num - 1) % 3) + 1}.jpg`}
                            alt="Training Session"
                            className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement;
                              t.src = "https://via.placeholder.com/400x300/6366f1/ffffff?text=Gym+Photo";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "certifications" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
                    {trainer.certifications?.length ? (
                      <div className="space-y-4">
                        {trainer.certifications.map((c, i) => (
                          <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 animate-[slideInUp_0.4s_ease-out]"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.name}</h3>
                            <p className="text-gray-600">
                              {c.description || "Professional certification in fitness training."}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">No certifications listed.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Mobile First */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Contact Card */}
              <div id="contact-card" className="bg-white rounded-2xl shadow-lg p-6 animate-[slideInRight_0.6s_ease-out]">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                    <div className="text-gray-900 font-semibold break-words text-sm">
                      {trainer.email}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                    <div className="text-gray-900 font-semibold">
                      {trainer.phone}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Instagram</label>
                    <div className="text-gray-900 font-semibold break-words text-sm">
                      {trainer.instagram}
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Call Form */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-[slideInRight_0.6s_ease-out_0.2s_both]">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Request a Call</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Submitted! (wire this to your API/Email later)");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-full hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Submit Request
                  </button>
                </form>
              </div>

              {/* Pricing Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-[slideInRight_0.6s_ease-out_0.4s_both]">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Session Pricing</h3>
                {pricing ? (
                  <div className="space-y-4">
                    {[
                      { label: "Per Session", price: pricing.per, badge: null },
                      { label: "5 Session Package", price: pricing.pack5, badge: "5% OFF" },
                      { label: "10 Session Package", price: pricing.pack10, badge: "10% OFF" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-200">
                        <div>
                          <span className="text-gray-700 font-medium block">{item.label}</span>
                          {item.badge && (
                            <span className="text-xs text-green-600 font-semibold">{item.badge}</span>
                          )}
                        </div>
                        <span className="text-purple-600 font-bold text-lg">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                    Pricing on request.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;