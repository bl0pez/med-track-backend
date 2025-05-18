import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OxygenTanksService } from './oxygen-tanks.service';
import { CreateOxygenTankDto } from './dto/create-oxygen-tank.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';

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

  @Get('serial-number/:serialNumber')
  @Auth(Role.ADMIN, Role.OPERATOR)
  findBySerialNumber(@Param('serialNumber') serialNumber: string) {
    return this.oxygenTanksService.findBySerialNumber(serialNumber);
  }

  @Get(':patientId')
  @Auth(Role.ADMIN, Role.OPERATOR, Role.CUSTOMER)
  findAllByPatientId(
    @Query() paginationDto: PaginationDto,
    @Param('patientId') patientId: number,
  ) {
    return this.oxygenTanksService.findAllByPatientId(paginationDto, patientId);
  }

  @Patch('return/:id')
  @Auth(Role.ADMIN, Role.OPERATOR)
  close(
    @Param('id') id: string,
    @Body('serialNumber') serialNumber: string,
    @GetUser() user: User,
  ) {
    return this.oxygenTanksService.returnTank(Number(id), serialNumber, user);
  }
}
