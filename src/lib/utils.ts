import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/api.ts
export async function fetchDashboardData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/counts`,{
        headers: {
         'ngrok-skip-browser-warning':'true',
         'Content-Type':'application/json'
        },
      });
  const data = await res.json();
  console.log('API Response:', data);
  if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard data');
  return data.data;
}

export async function fetchWarningsCount() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/warnings_count`,{
        headers: {
         'ngrok-skip-browser-warning':'true',
         'Content-Type':'application/json'
        },
      });
  const data = await res.json();
  console.log('warnibg:',data)
  if (!res.ok) throw new Error(data.message || 'Failed to fetch warnings count');
  return data.data;
}

export async function fetchDetectedContentOverWeeks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/detected_content_over_weeks`,{
        headers: {
         'ngrok-skip-browser-warning':'true',
         'Content-Type':'application/json'
        },
      });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch detected content over weeks');
  return data.data;
}


