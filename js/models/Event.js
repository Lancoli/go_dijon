export class Event {
    constructor({ time, title, place, description, url, source = null }) {
        this.time = time;           // string "HH:MM"
        this.title = title;         // string
        this.place = place;         // string | null
        this.description = description; // string (plain text)
        this.url = url;             // string | null
        this.source = source;       // provider identifier
    }
}
