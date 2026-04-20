export async function loadEvents(providers, date = new Date()) {
    const results = await Promise.allSettled(
        providers.map(p => p.fetchEvents(date))
    );

    return results
        .filter(r => r.status === "fulfilled")
        .flatMap(r => r.value)
        .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
}
