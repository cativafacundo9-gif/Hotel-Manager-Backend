import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto.js';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';

@Injectable()
export class MantenimientoService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureHabitacionExists(habitacionId: number) {
    const habitacion = await this.prisma.habitacion.findUnique({
      where: { id: habitacionId },
    });

    if (!habitacion) {
      throw new NotFoundException(`La habitación #${habitacionId} no existe.`);
    }
  }

  async create(createMantenimientoDto: CreateMantenimientoDto) {
    await this.ensureHabitacionExists(createMantenimientoDto.habitacionId);

    try {
      return await this.prisma.mantenimiento.create({
        data: {
          descripcion: createMantenimientoDto.descripcion,
          estado: createMantenimientoDto.estado ?? 'Pendiente',
          habitacionId: createMantenimientoDto.habitacionId,
        },
        include: {
          habitacion: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe un registro de mantenimiento con esos datos.',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.mantenimiento.findMany({
      orderBy: { id: 'asc' },
      include: {
        habitacion: true,
      },
    });
  }

  async findOne(id: number) {
    const mantenimiento = await this.prisma.mantenimiento.findUnique({
      where: { id },
      include: {
        habitacion: true,
      },
    });

    if (!mantenimiento) {
      throw new NotFoundException(
        `El registro de mantenimiento #${id} no existe.`,
      );
    }

    return mantenimiento;
  }

  async update(id: number, updateMantenimientoDto: UpdateMantenimientoDto) {
    const existing = await this.findOne(id);
    const nextHabitacionId =
      updateMantenimientoDto.habitacionId ?? existing.habitacionId;

    await this.ensureHabitacionExists(nextHabitacionId);

    try {
      return await this.prisma.mantenimiento.update({
        where: { id },
        data: {
          descripcion: updateMantenimientoDto.descripcion ?? existing.descripcion,
          estado: updateMantenimientoDto.estado ?? existing.estado,
          habitacionId: nextHabitacionId,
        },
        include: {
          habitacion: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe un registro de mantenimiento con esos datos.',
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.mantenimiento.delete({
      where: { id },
    });
  }
}