export default interface ScoreClient {
    score(cpf: string): Promise<number | null>;
}
