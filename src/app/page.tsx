"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  fetchDashboardData,
  fetchWarningsCount,
  fetchDetectedContentOverWeeks,
} from "@/lib/utils";
import ProtectedLayout from "@/components/ProtectedLayout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Homepage = () => {
  const [counts, setCounts] = useState({
    reported: 0,
    users: 0,
    banned: 0,
    warnedUsers: 0,
  });
  const [warningData, setWarningData] = useState([0, 0, 0, 0]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [weekLabels, setWeekLabels] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const countsRes = await fetchDashboardData();
        const warningsRes = await fetchWarningsCount();

        const warnedUsersTotal =
          (warningsRes.one_warning || 0) +
          (warningsRes.two_warnings || 0) +
          (warningsRes.more_than_two_warnings || 0);

        setCounts({
          reported: countsRes.total_reported_count || 0,
          users: (countsRes.total_users_count || 0)-1,
          banned: countsRes.total_banned_count || 0,
          warnedUsers: warnedUsersTotal,
        });

        setWarningData([
          warningsRes.zero_warnings || 0,
          warningsRes.one_warning || 0,
          warningsRes.two_warnings || 0,
          warningsRes.more_than_two_warnings || 0,
        ]);

        const contentOverWeeks = await fetchDetectedContentOverWeeks();
        setWeekLabels(contentOverWeeks.map((item: any) => `Week ${item.week}`));
        setWeeklyData(contentOverWeeks.map((item: any) => item.count));
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedLayout>
      <div className="flex gap-4 pt-4 px-2 sm:px-4 md:px-6">
        <Sidebar />
        <div className="p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-red-500 text-white rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold">Total Reported Content</h2>
              <p className="text-2xl font-bold">{counts.reported}</p>
            </div>
            <div className="p-4 bg-green-500 text-white rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">{counts.users}</p>
            </div>
            <div className="p-4 bg-purple-500 text-white rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold">Warnings Issued</h2>
              <p className="text-2xl font-bold">{counts.warnedUsers}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">
                Reported Content Trends
              </h2>
              <div className="h-[300px] sm:h-[350px]">
                <Line
                  data={{
                    labels: weekLabels,
                    datasets: [
                      {
                        label: "Reported Content (Weekly)",
                        data: weeklyData,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.3,
                      },
                    ],
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">
                Users by Warning Count
              </h2>
              <div className="h-[300px] sm:h-[350px]">
                <Pie
                  data={{
                    labels: ["No warning", "1 warning", "2 warnings", "3+ warnings"],
                    datasets: [
                      {
                        data: warningData,
                        backgroundColor: [
                          "#FF6384",
                          "#FFCE56",
                          "#36A2EB",
                          "#4BC0C0",
                        ],
                        hoverBackgroundColor: [
                          "#FF6384",
                          "#FFCE56",
                          "#36A2EB",
                          "#4BC0C0",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Homepage;
