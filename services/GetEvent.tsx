import { Event } from "@/types/Eventtype"

export default async function getEventByName(eventName: string) : Promise<Event> {
    const evento = await fetch("https://eventus-1mt4.onrender.com/api/events/eventByName/" + eventName, {
        method: "GET",
        cache: "no-store"
    })
    return await evento.json() as Event
}