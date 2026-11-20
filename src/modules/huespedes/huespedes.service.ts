import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huespede.dto.js';
import { UpdateHuespedDto } from './dto/update-huespede.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';

@Injectable()
export class HuespedesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHuespedDto: CreateHuespedDto) {
    try {
      return await this.prisma.huesped.create({
        data: createHuespedDto,
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          `Ya existe un huésped registrado con el email ${createHuespedDto.email}.`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.huesped.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const huesped = await this.prisma.huesped.findUnique({
      where: { id },
    });

    if (!huesped) {
      throw new NotFoundException(`El huésped #${id} no existe.`);
    }

    return huesped;
  }

  async update(id: number, updateHuespedDto: UpdateHuespedDto) {
    await this.findOne(id);

    try {
      return await this.prisma.huesped.update({
        where: { id },
        data: updateHuespedDto,
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          `Ya existe otro huésped con ese email.`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.huesped.delete({
      where: { id },
    });
  }
}