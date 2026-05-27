import http from '@/http/api';
import type { AdminReportAction, ReportedEvent } from '@/types/DashBoardTypes';

function getAuthHeaderIfAvailable(): Record<string, string> | undefined {
  try {
    if (typeof window === 'undefined') return undefined;
    const token = localStorage.getItem('eventus_admin_access_token');
    if (!token) return undefined;
    return { Authorization: `Bearer ${token}` };
  } catch (e) {
    return undefined;
  }
}

export async function getAdminReports() {
  const headers = getAuthHeaderIfAvailable();
  const response = await http.get<ReportedEvent[]>('/admin/reports', headers ? { headers } : undefined);
  return response.data;
}

export async function updateAdminEventReportsAction(eventId: string, action: AdminReportAction) {
  const headers = getAuthHeaderIfAvailable();
  await http.put(`/admin/reports/${eventId}/action`, { action }, headers ? { headers } : undefined);
}
