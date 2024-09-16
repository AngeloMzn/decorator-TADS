import axios from 'axios';
import ScoreClient from '../interface/ScoreClient';

// Implementação concreta do cliente base
export class BaseScoreClient implements ScoreClient {
    async score(cpf: string): Promise<number | null> {
        try {
            const response = await axios.get(`https://score.hsborges.dev/api/score`, {
                params: {
                    cpf
                }
            });
            return response.data;
        } catch (error) {
            console.error('Não foi possível buscar score:', error);
            return null;
        }
    }
}
