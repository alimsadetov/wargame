import { Game, WarriorsCollection } from "@prisma/client";

export class GameEntity implements Game {
    id: number;
    gameAddress: string;
    gamerAddress: string;
    botAddress: string;
    isFinished: boolean;
    isDeployed: boolean;
    userId: number;

    unitCollections: WarriorsCollection[]
}