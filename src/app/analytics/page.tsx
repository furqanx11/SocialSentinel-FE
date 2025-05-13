"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "@/components/Sidebar";
import ProtectedLayout from "@/components/ProtectedLayout";

const AnalyticsReports = () => {
  const [flaggedWordsData, setFlaggedWordsData] = useState<{ word: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
  const fetchDetectedWords = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/detected_words/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();

      if (json?.data && typeof json.data === "object") {
        const convertedData = Object.entries(json.data).map(([word, count]) => ({
          word,
          count: Number(count),
        }));
        setFlaggedWordsData(convertedData);
      }
    } catch (error) {
      console.error("Error fetching detected words:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDetectedWords(); // Initial fetch
  const interval = setInterval(fetchDetectedWords, 10000); // Poll every 10 seconds

  return () => clearInterval(interval); // Cleanup on unmount
}, []);

  return (
    <ProtectedLayout>
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Analytics & Reports</h2>
        <div className="flex flex-col gap-6 pt-6">

          {/* Trend Analysis (Most Flagged Words) */}
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 ">Most Flagged Words</h3>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={flaggedWordsData}>
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

         
        </div>
      </div>
    </div>
    </ProtectedLayout>
  );
};

export default AnalyticsReports;
