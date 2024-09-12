import ScoreClient from "../interface/ScoreClient";

export abstract class DecoratorClient implements ScoreClient {
    public client: ScoreClient;
    
    constructor(client: ScoreClient){
        this.client = client;
    }

    score(cpf: string): number{
        return this.client.score(cpf);
    }
}