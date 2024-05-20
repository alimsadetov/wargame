import { Game, Warrior, WarriorsCollection } from "@prisma/client";

export class WarriorsCollectionEntity implements WarriorsCollection {
    id: number;
    isBot: boolean;
    gameId: number;

    game:    Game
  units:   Warrior[]
    
    
}