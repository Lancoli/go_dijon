import { AbstractProvider } from "./base.js";
import { Event } from "../models/Event.js";

export class WordPressProvider extends AbstractProvider {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }

    get name() { return "wordpress"; }

    async fetchEvents(date) {
        const d = date.toISOString().split("T")[0];
        const url = `${this.baseUrl}/wp-json/tribe/events/v1/events?start_date=${d}&end_date=${d}`;
        const res = await fetch(url);
        const data = await res.json();

        return (data.events ?? []).map(raw => this.#normalize(raw));
    }

    // TODO: implement normalization — map raw WordPress event → Event model
    #normalize(raw) {
        const date = new Date(raw.start_date);
        const time = isNaN(date)
            ? null
            : date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

        const description = (raw.description ?? "").replace(/(<([^>]+)>)/gi, "").trim();

        return new Event({
            time,
            title: raw.title ?? "",
            place: raw.venue?.venue ?? null,
            description: description || null,
            url: raw.url ?? null,
            image: raw.image?.url ?? null,
            source: this.name,
        });
    }
}
