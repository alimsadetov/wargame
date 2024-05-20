import { $Enums, Warrior } from "@prisma/client";

export class WarriorEntity implements Warrior {

    id: string;
    address: string;
    isDead: boolean;
    isHillAvail: boolean;
    type: $Enums.WarriorType;
    hp: number;
    attackPower: number;
    protectionPower: number;
    hilling: number;
    collectionId: number;
}