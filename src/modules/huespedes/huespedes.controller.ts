import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuespedesService } from './huespedes.service.js';
import { CreateHuespedDto } from './dto/create-huespede.dto.js';
import { UpdateHuespedDto } from './dto/update-huespede.dto.js';

@Controller('huespedes')
export class HuespedesController {
  constructor(private readonly huespedesService: HuespedesService) {}

  @Post()
  create(@Body() createHuespedDto: CreateHuespedDto) {
    return this.huespedesService.create(createHuespedDto);
  }

  @Get()
  findAll() {
    return this.huespedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huespedesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuespedDto: UpdateHuespedDto) {
    return this.huespedesService.update(+id, updateHuespedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huespedesService.remove(+id);
  }
}