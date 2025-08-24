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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">Loading…</div>;
  }
  if (!trainer) return null;

  const isGym = !!trainer.is_gym;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/gym-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={
                    trainer.image && trainer.image !== "Not Available"
                      ? (String(trainer.image).startsWith("http")
                          ? trainer.image
                          : `/images/trainers/${trainer.image}`)
                      : fallbackImage(trainer.name, isGym)
                  }
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.onerror = null;
                    t.src = fallbackImage(trainer.name, isGym);
                  }}
                />
              </div>
              {trainer.is_online ? (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Online
                </div>
              ) : null}
            </div>

            <div className="text-center lg:text-left text-white flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{trainer.name}</h1>
              <div className="flex items-center justify-center lg:justify-start mb-4 gap-3">
                <span className="bg-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {isGym ? "Fitness Facility" : "Personal Trainer"}
                </span>
                <span className="text-lg">{trainer.location}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center bg-yellow-400 text-white font-bold px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {trainer.rating === "Not Available" ? "N/A" : trainer.rating} Rating
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    const anchor = document.getElementById("contact-card");
                    anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Contact Now
                </button>
                <button
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all"
                  onClick={() => router.push("/trainers")}
                >
                  ← Back to Trainers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs bar */}
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <nav className="flex space-x-2 border-b border-gray-200">
                {(["about", "services", "gallery", "certifications"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 text-sm font-medium ${
                      tab === t
                        ? "text-gray-900 border-b-2 border-purple-600"
                        : "text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-purple-600"
                    }`}
                  >
                    {t[0].toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {tab === "about" && (
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

                  {trainer.specializations?.length ? (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Specializations</h3>
                      <div className="flex flex-wrap gap-3">
                        {trainer.specializations.map((s, i) => (
                          <span key={i} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {trainer.badges?.length ? (
                    <div className="mb-8">
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
                            <span key={i} className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${cls}`}>
                              {b.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                      <p className="text-gray-700 text-lg font-semibold">{trainer.experience}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
                      {trainer.certifications?.length ? (
                        <ul className="space-y-2">
                          {trainer.certifications.map((c, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {c.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">Not Available</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {tab === "services" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Services</h2>
                  {trainer.specializations?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trainer.specializations.map((s, i) => (
                        <div
                          key={i}
                          className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors"
                        >
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{s.name}</h3>
                          <p className="text-gray-600 mb-4">
                            {s.description || `Professional ${s.name.toLowerCase()} training tailored to your fitness level and goals.`}
                          </p>
                          {pricing ? (
                            <div className="text-purple-600 font-bold">₹{pricing.per}/session</div>
                          ) : (
                            <div className="text-gray-400 font-semibold">Pricing on request</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Specialized training services available. Contact for details.</p>
                    </div>
                  )}
                </div>
              )}

              {tab === "gallery" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative rounded-xl overflow-hidden">
                      <img src="/images/trainers/gallery-1.jpg" alt="Training Session" className="w-full h-64 object-cover" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img src="/images/trainers/gallery-2.jpg" alt="Training Session" className="w-full h-64 object-cover" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img src="/images/trainers/gallery-3.jpg" alt="Training Session" className="w-full h-64 object-cover" />
                    </div>
                  </div>
                </div>
              )}

              {tab === "certifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
                  {trainer.certifications?.length ? (
                    <div className="space-y-6">
                      {trainer.certifications.map((c, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{c.name}</h3>
                          <p className="text-gray-600">
                            {c.description || "Professional certification in fitness training."}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No certifications listed.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div id="contact-card" className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
                  <div className="text-gray-900 font-semibold">{trainer.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <div className="text-gray-900 font-semibold">{trainer.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Instagram</label>
                  <div className="text-gray-900 font-semibold">{trainer.instagram}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Request a Call</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Submitted! (wire this to your API/Email later)");
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-full hover:bg-purple-700 transition-all"
                >
                  Submit Request
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Session Pricing</h3>
              {pricing ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Per Session</span>
                    <span className="text-purple-600 font-bold">₹{pricing.per}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">5 Session Package</span>
                    <span className="text-purple-600 font-bold">₹{pricing.pack5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">10 Session Package</span>
                    <span className="text-purple-600 font-bold">₹{pricing.pack10}</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">Pricing on request.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
