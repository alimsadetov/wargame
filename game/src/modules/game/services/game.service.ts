import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/database/prisma.service";
import { JwtPayload } from "src/types/jwt-payload.type";

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {

    }

    async getUserGames(userId: number){
        return this.prisma.game.findMany({where: {userId}, orderBy: {isFinished: 'desc'}})
    }

    async startNewGame(user: JwtPayload){
        const gameInBchAddress: string = await this.bchService.createGameInBch(user.address) 
        const game = await this.prisma.game.create({data: {userId: user.id, botAddress: 'from config', gamerAddress: user.address, gameAddress: gameInBchAddress}})
    }
}