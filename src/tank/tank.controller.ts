// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { TankService } from './tank.service';
// import { CreateTankDto } from './dto/create-tank.dto';
// import { UpdateTankDto } from './dto/update-tank.dto';
// import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { TankSearchDto } from './dto/tank-search.dto';

// @Controller('tank')
// export class TankController {
//   constructor(private readonly tankService: TankService) {}

//   @Post()
//   create(@Body() createTankDto: CreateTankDto) {
//     return this.tankService.create(createTankDto);
//   }

//   @Get()
//   findAll(@Query() paginationDto: PaginationDto) {
//     return this.tankService.findAll(paginationDto);
//   }

//   @Get('code/:code')
//   findByCode(@Param('code') code: string) {
//     return this.tankService.findOneByCode(code);
//   }

//   @Get('search')
//   search(@Query() tankSearchDto: TankSearchDto) {
//     return this.tankService.searchTanks(tankSearchDto);
//   }

//   @Patch(':id/close')
//   close(@Param('id') id: string) {
//     return this.tankService.close(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTankDto: UpdateTankDto) {
//     return this.tankService.update(+id, updateTankDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.tankService.remove(+id);
//   }
// }
