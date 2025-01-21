import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { findPatientsDto } from './dto/find-patients.dto';
import { FindOneByIdDto } from './dto/find-one-by-id.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll(@Query() query: findPatientsDto) {
    return await this.patientService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param() id: FindOneByIdDto) {
    return await this.patientService.findOneById(id);
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.create(createPatientDto);
  }
}
