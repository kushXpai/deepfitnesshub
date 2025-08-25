// app/trainers/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import TrainerCard, { TrainerCardData } from "../components/TrainerCard";

type ApiTrainer = TrainerCardData;

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<ApiTrainer[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters (mirror the old PHP)
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load initial trainers
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/trainers?limit=60`, { cache: "no-store" });
        const json = await res.json();
        setTrainers(Array.isArray(json) ? json : []);
      } catch (e) {
        console.error(e);
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Derive available training types from specializations (unique)
  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((t) => t.specializations?.forEach((s) => s && set.add(s)));
    return ["All Types", ...Array.from(set).sort()];
  }, [trainers]);

  const handleApply = async () => {
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (type && type !== "All Types") params.set("type", type);
      if (onlineOnly) params.set("online_only", "on");
      params.set("limit", "60");

      const res = await fetch(`/api/trainers?${params.toString()}`, { cache: "no-store" });
      const json = await res.json();
      setTrainers(Array.isArray(json) ? json : []);
    } catch (e) {
      console.error(e);
      setTrainers([]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = async () => {
    setSearch("");
    setType("");
    setOnlineOnly(false);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/trainers?limit=60`, { cache: "no-store" });
      const json = await res.json();
      setTrainers(Array.isArray(json) ? json : []);
    } catch (e) {
      console.error(e);
      setTrainers([]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="absolute inset-0  bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Trainer</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover expert fitness trainers tailored to your goals, whether it's weight loss,
            strength training, or overall wellness.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApply();
          }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter trainer name"
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Training Type
              </label>
              <select
                id="type"
                value={type || "All Types"}
                onChange={(e) => setType(e.target.value === "All Types" ? "" : e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                {availableTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Online Only */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="online_only"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="online_only" className="ml-2 text-sm font-medium text-gray-700">
                Online Only
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition-all disabled:opacity-60"
            >
              {submitting ? "Applying..." : "Apply Filters"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={submitting}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-300 transition-all disabled:opacity-60"
            >
              Clear Filters
            </button>
          </div>
        </form>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-gray-600">Loading trainers…</div>
        ) : trainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No trainers found matching your criteria.</p>
            <button
              onClick={handleClear}
              className="mt-4 inline-block bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              View All Trainers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainersPage;
