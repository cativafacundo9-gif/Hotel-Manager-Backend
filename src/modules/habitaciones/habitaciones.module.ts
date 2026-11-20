import { Module } from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service.js';
import { HabitacionesController } from './habitaciones.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
})
export class HabitacionesModule {}