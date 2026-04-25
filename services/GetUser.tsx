import { EventResponse } from "@/types/Eventtype"

// Tipos baseados nos arquivos do app mobile
export interface UserBase {
  uid?: string;
  id?: string;
  name: string;
  username?: string;
  accountType?: number;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
  qtdEvent?: number;
  follow?: number;
  following?: number;
  location?: {
    city?: string;
    country?: string;
  };
  organizer?: {
    organizeType?: number;
    descripcion?: string;
    redesSocial?: {
      instagramUrl?: string;
      facebookUrl?: string;
      tikTokUrl?: string;
    };
  };
}

export interface RespData {
  data?: UserBase;
}

export interface UserProfileData {
  data?: {
    user: UserBase;
    iFollow?: boolean;
    followsMe?: boolean;
    mutual?: boolean;
  };
}

const API_BASE = "https://eventus-1mt4.onrender.com/api/";

// Buscar usuário por ID
export async function getUserProfileById(userId: string): Promise<UserBase | undefined> {
  try {
    const response = await fetch(`${API_BASE}user/id/${userId}`, {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      console.error(`Erro ao buscar usuário: Status ${response.status}`);
      return undefined;
    }

    const data = await response.json() as RespData;
    console.log("Usuário recebido:", data.data);
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return undefined;
  }
}

// Buscar usuário por ID com status de follow (requer token)
export async function getUserProfileAndStatusFollow(userId: string): Promise<UserProfileData | undefined> {
  try {
    const response = await fetch(`${API_BASE}user/getUser?id=${userId}`, {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      console.error(`Erro ao buscar perfil: Status ${response.status}`);
      return undefined;
    }

    const data = await response.json() as UserProfileData;
    console.log("Perfil recebido:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return undefined;
  }
}

// Buscar todos os usuários
export async function getUsers(): Promise<UserBase[] | undefined> {
  try {
    const response = await fetch(`${API_BASE}user/`, {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      console.error(`Erro ao buscar usuários: Status ${response.status}`);
      return undefined;
    }

    const data = await response.json() as { data: UserBase[] };
    console.log("Usuários recebidos:", data.data);
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return undefined;
  }
}

// Buscar eventos de um usuário específico
export async function fetchEventsByUser(userId: string): Promise<EventResponse[] | undefined> {
  try {
    const response = await fetch(`${API_BASE}events/user/${userId}`, {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      console.error(`Erro ao buscar eventos do usuário: Status ${response.status}`);
      return undefined;
    }

    const data = await response.json() as { data: EventResponse[] };
    console.log("Eventos do usuário recebidos:", data.data);
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar eventos do usuário:", error);
    return undefined;
  }
}

// Seguir usuário (requer token)
export async function followUser(userId: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}user/follow/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      console.error(`Erro ao seguir usuário: Status ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao seguir usuário:", error);
    return false;
  }
}

// Deixar de seguir usuário (requer token)
export async function unfollowUser(userId: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}user/unfollow/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      console.error(`Erro ao deixar de seguir usuário: Status ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao deixar de seguir usuário:", error);
    return false;
  }
}
