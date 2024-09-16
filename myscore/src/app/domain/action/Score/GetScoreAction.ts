import ScoreClient from "../../interface/ScoreClient";
import { BaseScoreClient } from "../../model/BaseScoreClient";
import { CachedClient } from "../../model/CachedClient";
import { ControlledClient } from "../../model/ControlledClient";


export default async function getScore(cpf: string): Promise<number | null> {
    const baseClient: ScoreClient = new BaseScoreClient(); 
    const cachedClient = new CachedClient(baseClient, 10000);  
    const controlledClient = new ControlledClient(cachedClient);  
    return controlledClient.score(cpf);  
}
