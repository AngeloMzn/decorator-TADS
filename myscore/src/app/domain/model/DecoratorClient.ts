import axios from 'axios';
import ScoreClient from '../interface/ScoreClient';

export abstract class DecoratorClient implements ScoreClient {
    protected client: ScoreClient;

    constructor(client: ScoreClient) {
        this.client = client;
    }

    async score(cpf: string): Promise<number | null> {
        try {
            const response = await axios.get(`https://score.hsborges.dev/api/score`,  {
                params: {
                    cpf
                }
            });
            return response.data.score;
        } catch (error) {
            console.error('Erro não foi possível bucar o score:', error);
            return null;
        }
    }
}
