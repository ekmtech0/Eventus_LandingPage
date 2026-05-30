import http from '@/http/api';
import type { DashboardEvent } from '@/types/DashBoardTypes';
import type { EventStatus } from './eventStatus';

export type DashboardEventDetails = {
  eventId: string;
  eventName: string;
  categories: string[];
  name: string;
  title: string;
  userName: string;
  userPhotoUrl: string | null;
  userId: string;
  placeId: string;
  placeName: string;
  placeAddress: string;
  placeCity: string;
  placeLocation: {
    latitude: number;
    longitude: number;
    placeName: string;
    text: string;
  } | null;
  data: string;
  inicio: string;
  fim: string | null;
  descricao: string;
  imgs: {
    urls: string[];
    capa: number;
  } | null;
  commentCount: number;
  reactionCount: number;
  interestedCount: number;
  tipo: number;
  status: number;
  aiModerationNotes?: string | null;
  trustScore?: number | null;
};

export async function getDashboardEvents() {
  const response = await http.get<DashboardEvent[]>('/adm/dashboard/events');
  return response.data;
}

export async function getDashboardEventDetails(id: string) {
  const response = await http.get<DashboardEventDetails>(`/adm/dashboard/event/${id}`);
  return response.data;
}

export async function updateDashboardEventStatus(id: string, status: EventStatus) {
  await http.put(`/adm/dashboard/events/${id}/status`, null, { params: { status } });
}

