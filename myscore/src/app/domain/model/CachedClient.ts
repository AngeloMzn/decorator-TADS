import { DecoratorClient } from './DecoratorClient';
import ScoreClient from '../interface/ScoreClient';

interface CacheEntry {
    score: number | null;
    timestamp: number;
}

export class CachedClient extends DecoratorClient {
    private cache: { [cpf: string]: CacheEntry } = {};
    private cacheDuration: number; // Duration in milliseconds

    constructor(client: ScoreClient, cacheDuration: number) {
        super(client);
        this.cacheDuration = cacheDuration;
    }

    async score(cpf: string): Promise<number | null> {
        const now = Date.now();
        const cachedEntry = this.cache[cpf];

        if (cachedEntry && (now - cachedEntry.timestamp < this.cacheDuration)) {
            return cachedEntry.score;
        }

        const score = await this.client.score(cpf);
        this.cache[cpf] = { score, timestamp: now };
        return score;
    }
}
