export function formatDate(dateIso: string) {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) return dateIso;
  return date.toLocaleDateString('pt-PT', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

