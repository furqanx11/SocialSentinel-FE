"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";

const UserReportDetails = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [reportDetails, setReportDetails] = useState<Record<string, number> | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Fetch user details (to get username)
  const fetchUserDetails = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user/${userId}`);
    console.log("User Details Response:", res.data); // 👈 Log this
    setUsername(res.data.data.username || "Unknown User"); // ✅ Adjust based on real structure
  } catch (error) {
    console.error("Error fetching user details:", error);
    setUsername("Unknown User");
  }
};

const fetchReport = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/detected_word/${userId}`);
    console.log("Detected Words Response:", res.data);
    setReportDetails(res.data.data || {});
  } catch (error) {
    console.error("Error fetching detected words:", error);
    setReportDetails({});
  }
};



  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchReport();
    }
  }, [userId]);

  if (reportDetails === null || username === null) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <div className="p-6 w-full bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-1">
            User: <span className="text-blue-600">{username}</span>
          </h2>
          <span className="text-black">Detected Words</span>
          {Object.keys(reportDetails).length === 0 ? (
            <p>No abusive words detected for this user.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-200 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Word</th>
                  <th className="border p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reportDetails).map(([word, count], index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{word}</td>
                    <td className="border p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4 flex justify-end text-xs sm:text-sm">
            <button
              onClick={() => router.push("/warninguser")}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserReportDetails;
