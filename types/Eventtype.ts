export type Event = {
  eventId: string;
  eventName: string;
  title: string;
  descricao: string;
  categoria: string;
  tipo: number;

  data: string; // ISO date
  inicio: string; // HH:mm
  fim: string; // HH:mm

  autolocation: {
    latitude: number;
    longitude: number;
  };

  manualLocation: {
    bairro: string;
    endereco: string;
    municipio: string;
    nomeLocal: string;
  };

  imgs: {
    capa: number;
    urls: string[];
  };

  userId: string;
  userName: string;
  userPhotoUrl: string;
};