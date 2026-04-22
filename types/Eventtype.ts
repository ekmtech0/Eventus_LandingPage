export interface EventResponse {
    name : string;
    eventId: string;
    eventName: string;
    title: string;
    categories: string[];

    userName: string;
    userPhotoUrl: string | null;

    imgs: Imgs;

    eventImages?:Imgs

    id?:string;
    latitude?: number;
    longitude?: number;

    placeId: string;
    placeName: string;
    placeAddress: string,
    placeCity: string;
    placeLocation: {
        latitude: number,
        longitude: number,
        placeName: string,
        text: string
    },

    data: string;
    inicio: string;
    fim: string | null;

    descricao: string;
    tipo: EventType;


    valor?: number;

    userId: string; // para navegação ao perfil do organizador

    commentCount: number;
    reactionCount: number;
    interestedCount: number;
    hasReacted: boolean;
    isSaved: boolean;
    shareCount: number;
}
export enum EventType {
    pago,
    gratuito
}
type Imgs = {
    urls: string[];
    capa: number;
}

export type Event = EventResponse;