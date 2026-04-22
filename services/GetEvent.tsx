import { EventResponse } from "@/types/Eventtype"

export default async function getEventByName(eventName: string): Promise<EventResponse | undefined> {
    try {

        const evento = await fetch("https://eventus-1mt4.onrender.com/api/events/eventByName/" + eventName, {
            method: "GET",
            cache: "no-store"
        })

        const eventResponse = await evento.json() as EventResponse

        console.log("Evento recebido:", eventResponse) // Log para verificar o conteúdo do evento

        return eventResponse
    }
    catch (error) {
        console.log("Erro ao buscar evento:", error)
    }
}