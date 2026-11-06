import { Injectable } from '@nestjs/common';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto.js';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto.js';

@Injectable()
export class MantenimientoService {
  create(createMantenimientoDto: CreateMantenimientoDto) {
    return 'This action adds a new mantenimiento';
  }

  findAll() {
    return `This action returns all mantenimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mantenimiento`;
  }

  update(id: number, updateMantenimientoDto: UpdateMantenimientoDto) {
    return `This action updates a #${id} mantenimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} mantenimiento`;
  }
}
