import { DecoratorClient } from "./DecoratorClient";

export class CachedClient extends DecoratorClient {
    score(cpf: string): number {
        return this.client.score(cpf);
    }
}