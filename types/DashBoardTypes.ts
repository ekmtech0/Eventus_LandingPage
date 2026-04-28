export type UserRole = 'Admin' | 'SuperAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Suspended' | 'Blocked';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export type EventStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  venueId: string;
  organizerId: string;
  status: EventStatus;
  ticketPrice: number;
  capacity: number;
  ticketsSold: number;
  image?: string;
  createdAt: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  status: 'Active' | 'Inactive' | 'PendingApproval';
  ownerId: string;
  image?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  pendingEvents: number;
  approvedEvents: number;
  cancelledEvents: number;
  totalVenues: number;
}
