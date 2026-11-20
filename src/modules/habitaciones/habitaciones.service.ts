import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto.js';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';

@Injectable()
export class HabitacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHabitacioneDto: CreateHabitacioneDto) {
    try {
      return await this.prisma.habitacion.create({
        data: {
          numero: createHabitacioneDto.numero,
          tipo: createHabitacioneDto.tipo,
          precio: createHabitacioneDto.precio,
          disponible: createHabitacioneDto.disponible ?? true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          `Ya existe una habitación con el número ${createHabitacioneDto.numero}.`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.habitacion.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const habitacion = await this.prisma.habitacion.findUnique({
      where: { id },
    });

    if (!habitacion) {
      throw new NotFoundException(`La habitación #${id} no existe.`);
    }

    return habitacion;
  }

  async update(id: number, updateHabitacioneDto: UpdateHabitacioneDto) {
    await this.findOne(id);

    try {
      return await this.prisma.habitacion.update({
        where: { id },
        data: updateHabitacioneDto,
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          `Ya existe otra habitación con ese número.`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.habitacion.delete({
      where: { id },
    });
  }
}