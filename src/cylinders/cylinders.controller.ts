import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CylindersService } from './cylinders.service';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('cylinders')
export class CylindersController {
  constructor(private readonly cylindersService: CylindersService) {}

  @Post()
  @Auth(Role.OPERATOR, Role.ADMIN)
  create(@Body() createCylinderDto: CreateCylinderDto) {
    return this.cylindersService.create(createCylinderDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.cylindersService.findAll(paginationDto);
  }
}
