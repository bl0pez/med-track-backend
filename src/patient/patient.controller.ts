import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Auth(Role.OPERATOR)
  create(@Body() createPatientDto: CreatePatientDto, @GetUser() user: User) {
    return this.patientService.create(createPatientDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.patientService.findAll(paginationDto);
  }
}
