"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AddTrainerPage() {
  const [form, setForm] = useState({
    gym_name: "",
    trainer_name: "",
    experience: "",
    location: "",
    services_offered: "",
    mobile_number: "",
    email: "",
    instagram: "",
    caption_snippet: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/add-trainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add trainer");
      setMessage("✅ Trainer added successfully!");
      setForm({
        gym_name: "",
        trainer_name: "",
        experience: "",
        location: "",
        services_offered: "",
        mobile_number: "",
        email: "",
        instagram: "",
        caption_snippet: "",
      });
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { key: "gym_name", label: "Gym Name", type: "text", icon: "🏋️", placeholder: "Enter gym name" },
    { key: "trainer_name", label: "Trainer Name", type: "text", icon: "👤", placeholder: "Enter trainer's full name" },
    { key: "experience", label: "Experience", type: "text", icon: "⭐", placeholder: "e.g., 5 years" },
    { key: "location", label: "Location", type: "text", icon: "📍", placeholder: "City, State" },
    { key: "services_offered", label: "Services Offered", type: "text", icon: "🎯", placeholder: "e.g., Personal Training, Yoga" },
    { key: "mobile_number", label: "Mobile Number", type: "tel", icon: "📱", placeholder: "+91 9876543210" },
    { key: "email", label: "Email", type: "email", icon: "✉️", placeholder: "trainer@example.com" },
    { key: "instagram", label: "Instagram Handle", type: "text", icon: "📸", placeholder: "@username" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600">
      {/* Header */}
      <div className="pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/admin" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Add New Trainer
            </h1>
            <p className="text-purple-100 text-lg">
              Expand your fitness team with qualified professionals
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {formFields.map(({ key, label, type, icon, placeholder }) => (
                  <div key={key} className="space-y-2">
                    <label
                      className="flex items-center text-white font-semibold text-sm"
                      htmlFor={key}
                    >
                      <span className="text-lg mr-2">{icon}</span>
                      {label}
                    </label>
                    <input
                      type={type}
                      id={key}
                      name={key}
                      value={form[key as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                                 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                                 hover:bg-white/25 transition-all duration-300"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Caption Snippet - Full Width */}
              <div className="mb-8">
                <label
                  className="flex items-center text-white font-semibold text-sm mb-2"
                  htmlFor="caption_snippet"
                >
                  <span className="text-lg mr-2">📝</span>
                  Caption Snippet
                </label>
                <textarea
                  id="caption_snippet"
                  name="caption_snippet"
                  value={form.caption_snippet}
                  onChange={handleChange}
                  placeholder="Brief description or motivational quote about the trainer..."
                  rows={4}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-4 
                             text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 
                             hover:bg-white/25 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 
                             text-white font-bold py-4 px-12 rounded-2xl shadow-lg transition-all duration-300 
                             transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed 
                             disabled:transform-none flex items-center justify-center min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Trainer...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Trainer
                    </>
                  )}
                </button>

                {/* Success/Error Message */}
                {message && (
                  <div className={`p-4 rounded-2xl border ${
                    message.includes('✅') 
                      ? 'bg-green-500/20 border-green-400/30 text-green-100' 
                      : 'bg-red-500/20 border-red-400/30 text-red-100'
                  } backdrop-blur-sm`}>
                    <p className="text-center font-medium">{message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Tips for Adding Trainers</h3>
                <ul className="text-purple-100 text-sm space-y-1">
                  <li>• Ensure all contact information is accurate and up-to-date</li>
                  <li>• Use professional photos and compelling descriptions</li>
                  <li>• Verify trainer certifications and experience before adding</li>
                  <li>• Include specific services and specializations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}