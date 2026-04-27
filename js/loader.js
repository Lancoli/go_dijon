export async function loadEventsForProvider(provider, date, cache) {
    const key = `${provider.name}:${date.toISOString().split("T")[0]}`;
    if (!cache.isStale(key)) return cache.get(key);
    const events = await provider.fetchEvents(date);
    cache.set(key, events);
    return events;
}

export async function loadEvents(providers, date = new Date(), cache = null) {
    const fetchers = cache
        ? providers.map(p => loadEventsForProvider(p, date, cache))
        : providers.map(p => p.fetchEvents(date));

    const results = await Promise.allSettled(fetchers);

    return results
        .filter(r => r.status === "fulfilled")
        .flatMap(r => r.value)
        .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
}
