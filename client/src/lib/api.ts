export interface TripPlannerRequest {
  type: '3-day' | '7-day' | 'adventure' | 'cultural';
  duration?: 'flexible' | 'strict' | 'extended';
  groupSize?: 'solo' | 'couple' | 'family' | 'group';
  interests?: string[];
}

export async function postTripPlanner(req: TripPlannerRequest) {
  const res = await fetch('/api/trip-planner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Trip planner failed: ${res.status} ${text}`);
  }
  return res.json();
}
