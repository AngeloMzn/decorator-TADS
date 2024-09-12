import { DecoratorClient } from "./DecoratorClient";

export class ControlledClient extends DecoratorClient {
    score(cpf: string): number {
        return this.client.score(cpf);
    }
}