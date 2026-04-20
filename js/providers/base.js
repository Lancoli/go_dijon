export class AbstractProvider {
    get name() {
        throw new Error("Provider must define a name");
    }

    // Must return Promise<Event[]>
    async fetchEvents(date) {
        throw new Error("Provider must implement fetchEvents(date: Date): Promise<Event[]>");
    }
}
