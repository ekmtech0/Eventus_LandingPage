import { Event } from "@/types/Eventtype";

export const MOCK_EVENTS: Event[] = [
  {
    eventId: "1",
    eventName: "Festival-de-Jazz",
    title: "Festival de Jazz de Luanda",
    descricao:
      "O maior festival de jazz do país, reunindo artistas locais e internacionais para uma noite inesquecível.",
    categoria: "Música",
    tipo: 1,
    data: "2026-05-23",
    inicio: "18:00",
    fim: "23:00",
    autolocation: {
      latitude: -8.8201,
      longitude: 13.2450,
    },
    manualLocation: {
      bairro: "Ilha",
      endereco: "Av. 4 de Fevereiro, Luanda",
      municipio: "Luanda",
      nomeLocal: "Centro de Convenções de Talatona",
    },
    imgs: {
      capa: 0,
      urls: [
        "https://images.unsplash.com/photo-1543900694-133f37abaaa5?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    userId: "u1",
    userName: "Festival Team",
    userPhotoUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80",
  },
  {
    eventId: "2",
    eventName: "Workshop-de-Fotografia",
    title: "Workshop de Fotografia Urbana",
    descricao:
      "Aprenda técnicas de fotografia urbana com profissionais e descubra novos pontos na cidade.",
    categoria: "Educação",
    tipo: 2,
    data: "2026-06-10",
    inicio: "14:00",
    fim: "18:00",
    autolocation: {
      latitude: -8.8390,
      longitude: 13.2375,
    },
    manualLocation: {
      bairro: "Talatona",
      endereco: "Rua Principal, 120",
      municipio: "Luanda",
      nomeLocal: "Espaço Criativo",
    },
    imgs: {
      capa: 0,
      urls: [
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    userId: "u2",
    userName: "FotoStudio",
    userPhotoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
  },

   {
    eventId: "3",
    eventName: "Workshop-de-Fotografia",
    title: "Workshop de Fotografia Urbana",
    descricao:
      "Aprenda técnicas de fotografia urbana com profissionais e descubra novos pontos na cidade.",
    categoria: "Educação",
    tipo: 2,
    data: "2026-06-10",
    inicio: "14:00",
    fim: "18:00",
    autolocation: {
      latitude: -8.8390,
      longitude: 13.2375,
    },
    manualLocation: {
      bairro: "Talatona",
      endereco: "Rua Principal, 120",
      municipio: "Luanda",
      nomeLocal: "Espaço Criativo",
    },
    imgs: {
      capa: 0,
      urls: [
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    userId: "u2",
    userName: "FotoStudio",
    userPhotoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
  },
];
