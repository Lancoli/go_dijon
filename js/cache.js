const TTL_MS = 6 * 60 * 60 * 1000;

export class CacheService {
    get(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return [];
            return JSON.parse(raw).events ?? [];
        } catch {
            return [];
        }
    }

    set(key, events) {
        localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), events }));
    }

    isStale(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return true;
            return Date.now() - JSON.parse(raw).timestamp > TTL_MS;
        } catch {
            return true;
        }
    }
}
