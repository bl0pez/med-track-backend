import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OxygenTanksService } from './oxygen-tanks.service';
import { CreateOxygenTankDto } from './dto/create-oxygen-tank.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('oxygen-tanks')
export class OxygenTanksController {
  constructor(private readonly oxygenTanksService: OxygenTanksService) {}

  @Post()
  @Auth(Role.ADMIN, Role.OPERATOR)
  create(
    @Body() createOxygenTankDto: CreateOxygenTankDto,
    @GetUser('id') userId: number,
  ) {
    return this.oxygenTanksService.create(createOxygenTankDto, userId);
  }

  @Get(':patientId')
  @Auth(Role.ADMIN, Role.OPERATOR)
  findAllByPatientId(
    @Query() paginationDto: PaginationDto,
    @Param('patientId') patientId: number,
  ) {
    return this.oxygenTanksService.findAllByPatientId(paginationDto, patientId);
  }
}
