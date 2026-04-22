import { EventResponse } from "@/types/Eventtype"

export default async function getEventByName(eventName: string): Promise<EventResponse | undefined> {
    try {
        // Decodificar o eventName em caso de ser uma URL encoded
        const decodedName = decodeURIComponent(eventName);
        
        const apiUrl = `https://eventus-1mt4.onrender.com/api/events/eventByName/${encodeURIComponent(decodedName)}`;
        
        const evento = await fetch(apiUrl, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!evento.ok) {
            console.error(`Erro ao buscar evento: Status ${evento.status}`);
            return undefined;
        }

        const eventResponse = await evento.json() as EventResponse

        console.log("Evento recebido:", eventResponse)

        return eventResponse
    }
    catch (error) {
        console.error("Erro ao buscar evento:", error)
        return undefined;
    }
}