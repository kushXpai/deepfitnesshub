"use client";

import React, { useState } from "react";

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">
          ➕ Add New Trainer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label
                className="block text-sm font-medium text-gray-700 capitalize"
                htmlFor={key}
              >
                {key.replace("_", " ")}
              </label>
              {key === "caption_snippet" ? (
                <textarea
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full text-black border-gray-300 rounded-lg p-2 hover:border-purple-500 focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                />
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full text-black border-gray-700 rounded-lg p-2 hover:border-purple-500 focus:ring-purple-500 focus:border-purple-500"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            {loading ? "Saving..." : "Add Trainer"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
