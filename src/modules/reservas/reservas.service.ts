import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto.js';
import { UpdateReservaDto } from './dto/update-reserva.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  private validateDateRange(fechaInicio: Date, fechaFin: Date) {
    if (fechaFin <= fechaInicio) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la fecha de inicio.',
      );
    }
  }

  private async ensureHuespedExists(huespedId: number) {
    const huesped = await this.prisma.huesped.findUnique({
      where: { id: huespedId },
    });

    if (!huesped) {
      throw new NotFoundException(`El huésped #${huespedId} no existe.`);
    }
  }

  private async ensureHabitacionExists(habitacionId: number) {
    const habitacion = await this.prisma.habitacion.findUnique({
      where: { id: habitacionId },
    });

    if (!habitacion) {
      throw new NotFoundException(`La habitación #${habitacionId} no existe.`);
    }
  }

  async create(createReservaDto: CreateReservaDto) {
    const fechaInicio = new Date(createReservaDto.fechaInicio);
    const fechaFin = new Date(createReservaDto.fechaFin);

    this.validateDateRange(fechaInicio, fechaFin);
    await this.ensureHuespedExists(createReservaDto.huespedId);
    await this.ensureHabitacionExists(createReservaDto.habitacionId);

    try {
      return await this.prisma.reserva.create({
        data: {
          huespedId: createReservaDto.huespedId,
          habitacionId: createReservaDto.habitacionId,
          fechaInicio,
          fechaFin,
        },
        include: {
          huesped: true,
          habitacion: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException('Ya existe una reserva con esos datos.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.reserva.findMany({
      orderBy: { id: 'asc' },
      include: {
        huesped: true,
        habitacion: true,
      },
    });
  }

  async findOne(id: number) {
    const reserva = await this.prisma.reserva.findUnique({
      where: { id },
      include: {
        huesped: true,
        habitacion: true,
      },
    });

    if (!reserva) {
      throw new NotFoundException(`La reserva #${id} no existe.`);
    }

    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const existing = await this.findOne(id);

    const nextHuespedId = updateReservaDto.huespedId ?? existing.huespedId;
    const nextHabitacionId =
      updateReservaDto.habitacionId ?? existing.habitacionId;
    const nextFechaInicio = updateReservaDto.fechaInicio
      ? new Date(updateReservaDto.fechaInicio)
      : existing.fechaInicio;
    const nextFechaFin = updateReservaDto.fechaFin
      ? new Date(updateReservaDto.fechaFin)
      : existing.fechaFin;

    this.validateDateRange(nextFechaInicio, nextFechaFin);
    await this.ensureHuespedExists(nextHuespedId);
    await this.ensureHabitacionExists(nextHabitacionId);

    try {
      return await this.prisma.reserva.update({
        where: { id },
        data: {
          huespedId: nextHuespedId,
          habitacionId: nextHabitacionId,
          fechaInicio: nextFechaInicio,
          fechaFin: nextFechaFin,
        },
        include: {
          huesped: true,
          habitacion: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException('Ya existe una reserva con esos datos.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.reserva.delete({
      where: { id },
    });
  }
}