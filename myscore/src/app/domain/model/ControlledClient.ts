import { DecoratorClient } from './DecoratorClient';
import ScoreClient from '../interface/ScoreClient';

export class ControlledClient extends DecoratorClient {
    private lastRequestTime: number | null = null;
    private readonly requestInterval = 10000; 

    constructor(client: ScoreClient) {
        super(client);  
    }

    async score(cpf: string): Promise<number | null> {
        const currentTime = Date.now();
        if (this.lastRequestTime && currentTime - this.lastRequestTime < this.requestInterval) {
            const delay = this.requestInterval - (currentTime - this.lastRequestTime);
            await this.sleep(delay);  
        }
        this.lastRequestTime = Date.now();  
        return this.client.score(cpf);  
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
