import { Injectable } from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huespede.dto.js';
import { UpdateHuespedDto } from './dto/update-huespede.dto.js';

@Injectable()
export class HuespedesService {
  create(createHuespedDto: CreateHuespedDto) {
    return 'This action adds a new huesped';
  }

  findAll() {
    return `This action returns all huespedes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} huesped`;
  }

  update(id: number, updateHuespedDto: UpdateHuespedDto) {
    return `This action updates a #${id} huesped`;
  }

  remove(id: number) {
    return `This action removes a #${id} huesped`;
  }
}