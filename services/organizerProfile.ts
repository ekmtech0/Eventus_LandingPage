import type { EventResponse } from "@/types/Eventtype";
import { fetchEventsByUser, getUsers, type UserBase } from "@/services/GetUser";

export interface AddressFeature {
  city?: string;
  country?: string;
}

export interface RedesSociais {
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  photo?: string;
}

export interface OrganizerEvent {
  id: string;
  name: string;
  title?: string;
  slug?: string;
  date: string;
  location: string;
  attendees: number;
  image?: string;
  price?: number;
}

export interface OrganizerProfileData {
  id: string;
  name: string;
  username?: string;
  slug: string;
  photo?: string;
  accountType: "Organizer";
  organizadorName?: string;
  organizeType: "Individual" | "Company" | "Other";
  descripcion?: string;
  redesSocial?: RedesSociais;
  qtdEvent: number;
  followers: number;
  following: number;
  userLocation?: AddressFeature;
  places?: Place[];
  events?: OrganizerEvent[];
}

export function slugifyOrganizerName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeUrl(
  value?: string,
  platform?: "instagram" | "facebook" | "tiktok" | "website",
) {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (platform === "instagram") {
    return `https://instagram.com/${trimmed.replace(/^@/, "")}`;
  }

  if (platform === "facebook") {
    return `https://facebook.com/${trimmed.replace(/^\//, "")}`;
  }

  if (platform === "tiktok") {
    return `https://tiktok.com/@${trimmed.replace(/^@/, "")}`;
  }

  if (platform === "website") {
    return `https://${trimmed.replace(/^\/+/, "")}`;
  }

  return trimmed;
}

function mapEvent(event: EventResponse): OrganizerEvent {
  const coverIndex = event.imgs?.capa ?? 0;
  const coverImage = event.imgs?.urls?.[coverIndex];

  return {
    id: event.eventId || event.id || event.eventName,
    name: event.name,
    title: event.title,
    slug: event.eventName,
    date: event.data || event.inicio,
    location: [event.placeName, event.placeCity].filter(Boolean).join(", "),
    attendees: event.interestedCount || event.reactionCount || 0,
    image: coverImage,
    price: event.valor,
  };
}

export function mapUserToOrganizerProfile(
  user: UserBase,
  events: EventResponse[] = [],
): OrganizerProfileData {
  const name = user.name || user.username || "Organizador";

  return {
    id: user.uid || user.id || "",
    name,
    username: user.username,
    slug: slugifyOrganizerName(user.username || name),
    photo: user.photo || "",
    accountType: "Organizer",
    organizadorName: user.name,
    organizeType:
      user.organizer?.organizeType === 1
        ? "Company"
        : user.organizer?.organizeType === 2
          ? "Other"
          : "Individual",
    descripcion: user.organizer?.descripcion || user.bio || "",
    redesSocial: {
      instagram: normalizeUrl(
        user.organizer?.redesSocial?.instagramUrl || user.instagram,
        "instagram",
      ),
      facebook: normalizeUrl(
        user.organizer?.redesSocial?.facebookUrl || user.facebook,
        "facebook",
      ),
      tikTok: normalizeUrl(
        user.organizer?.redesSocial?.tikTokUrl || user.tikTok,
        "tiktok",
      ),
      website: normalizeUrl(user.website, "website"),
    },
    qtdEvent: user.qtdEvent || events.length,
    followers: user.following || 0,
    following: user.follow || 0,
    userLocation: user.location
      ? { city: user.location.city, country: user.location.country }
      : undefined,
    events: events.map(mapEvent),
  };
}

export async function getOrganizerProfileBySlug(
  organizerName: string,
): Promise<OrganizerProfileData | null> {
  const users = await getUsers();

  if (!users?.length) {
    return null;
  }

  const normalizedSlug = slugifyOrganizerName(decodeURIComponent(organizerName));

  const user = users.find((candidate) => {
    const usernameSlug = candidate.username
      ? slugifyOrganizerName(candidate.username)
      : "";
    const nameSlug = candidate.name ? slugifyOrganizerName(candidate.name) : "";

    return (
      candidate.accountType === 1 &&
      (usernameSlug === normalizedSlug || nameSlug === normalizedSlug)
    );
  });

  if (!user) {
    return null;
  }

  const userId = user.uid || user.id;
  const events = userId ? (await fetchEventsByUser(userId)) ?? [] : [];

  return mapUserToOrganizerProfile(user, events);
}
