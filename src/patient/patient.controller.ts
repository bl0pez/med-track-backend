import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { findPatientsDto } from './dto/find-patients.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get()
  async findAll(@Query() query: findPatientsDto) {
    return await this.patientService.findAll(query);
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.create(createPatientDto);
  }
}
