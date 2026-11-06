import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service.js';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto.js';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto.js';

@Controller('mantenimiento')
export class MantenimientoController {
  constructor(private readonly mantenimientoService: MantenimientoService) {}

  @Post()
  create(@Body() createMantenimientoDto: CreateMantenimientoDto) {
    return this.mantenimientoService.create(createMantenimientoDto);
  }

  @Get()
  findAll() {
    return this.mantenimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantenimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMantenimientoDto: UpdateMantenimientoDto) {
    return this.mantenimientoService.update(+id, updateMantenimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantenimientoService.remove(+id);
  }
}
