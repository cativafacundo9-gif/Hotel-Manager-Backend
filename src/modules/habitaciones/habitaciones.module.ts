import { Module } from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service.js';
import { HabitacionesController } from './habitaciones.controller.js';

@Module({
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
})
export class HabitacionesModule {}
