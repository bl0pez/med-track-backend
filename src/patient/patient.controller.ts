import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.create(createPatientDto);
  }
}
