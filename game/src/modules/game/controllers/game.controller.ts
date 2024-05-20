import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetJwtPayload } from 'src/decorators/get-jwtpayload.decorator';
import { JwtPayload } from 'src/types/jwt-payload.type';
import { Auth } from 'src/guards/auth.decorator';
import { GameService } from '../services/game.service';
import { GameEntity } from '../entities/game.entity';

@ApiTags('Game')
@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // @Get()
  // @Auth()
  // @ApiOperation({ summary: 'АДМИН   Получить все заявки' })
  // //@ApiResponse({ status: 200, type: , isArray: true })
  // async getAll(@GetJwtPayload() user: JwtPayload): Promise<GameEntity[]> {
  //   return this.gameService.getAplications(user);
  // }

  // @Get('/:id')
  // @Auth()
  // @ApiOperation({ summary: 'АДМИН   Получить заявку' })
  // //@ApiResponse({ status: 200, type: , isArray: true })
  // async getById(@GetJwtPayload() user: JwtPayload, @Param('id', ParseIntPipe) id: number): Promise<GameEntity> {
  //   return this.gameService.getAplication(user, id);
  // }

  // @Post()
  // @Auth()
  // @ApiOperation({ summary: 'ЭКСТРАНЕТ   Добавить заявку' })
  // @ApiBody({ type: AddApplicationDto })
  // //@ApiResponse({ status: 200, type: , isArray: true })
  // async add(@GetJwtPayload() user: JwtPayload, @Body() dto: AddApplicationDto): Promise<GameEntity> {
  //   return this.gameService.addApplication(user, dto);
  // }

  // @Put()
  // @Auth()
  // @ApiOperation({ summary: 'АДМИН   Обновить заявку' })
  // @ApiBody({ type: EditApplicationDto })
  // //@ApiResponse({ status: 200, type: , isArray: true })
  // async edit(@GetJwtPayload() user: JwtPayload, @Body() dto: EditApplicationDto): Promise<GameEntity> {
  //   return this.gameService.editApplication(user, dto);
  // }
}
