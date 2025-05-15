import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindOneByIdDto } from './dto/find-one-by-id.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Auth(Role.OPERATOR, Role.ADMIN)
  create(@Body() createPatientDto: CreatePatientDto, @GetUser() user: User) {
    return this.patientService.create(createPatientDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.patientService.findAll(paginationDto);
  }

  @Put('close/:id')
  @Auth(Role.OPERATOR, Role.ADMIN)
  closePatient(@Param('id') id: string, @GetUser() user: User) {
    return this.patientService.close(Number(id), user);
  }

  @Get(':id')
  @Auth()
  findOneById(@Param() id: FindOneByIdDto) {
    return this.patientService.findOneById(id);
  }
}
