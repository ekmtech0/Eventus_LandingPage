export enum EventStatus {
  Draft = 0,
  Pending = 1,
  Published = 2,
  Active = 3,
  Cancelled = 4,
  Rejected = 5,
  Completed = 6,
}

export const EVENT_STATUS_FILTERS: Array<{ label: string; value: number | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Pending', value: EventStatus.Pending },
  { label: 'Published', value: EventStatus.Published },
  { label: 'Active', value: EventStatus.Active },
  { label: 'Cancelled', value: EventStatus.Cancelled },
  { label: 'Rejected', value: EventStatus.Rejected },
  { label: 'Completed', value: EventStatus.Completed },
  { label: 'Draft', value: EventStatus.Draft },
];

export function statusLabel(status: number) {
  switch (status) {
    case EventStatus.Draft:
      return 'Draft';
    case EventStatus.Pending:
      return 'Pending';
    case EventStatus.Published:
      return 'Published';
    case EventStatus.Active:
      return 'Active';
    case EventStatus.Cancelled:
      return 'Cancelled';
    case EventStatus.Rejected:
      return 'Rejected';
    case EventStatus.Completed:
      return 'Completed';
    default:
      return `Unknown (${status})`;
  }
}

export function statusBadgeClasses(status: number) {
  switch (status) {
    case EventStatus.Active:
      return 'bg-emerald-100 text-emerald-800';
    case EventStatus.Published:
      return 'bg-blue-100 text-blue-800';
    case EventStatus.Pending:
      return 'bg-amber-100 text-amber-800';
    case EventStatus.Draft:
      return 'bg-gray-100 text-gray-800';
    case EventStatus.Completed:
      return 'bg-violet-100 text-violet-800';
    case EventStatus.Cancelled:
    case EventStatus.Rejected:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

