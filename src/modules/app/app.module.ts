import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HabitacionesModule } from '../habitaciones/habitaciones.module.js';
import { HuespedesModule } from '../huespedes/huespedes.module.js';
import { ReservasModule } from '../reservas/reservas.module.js';
import { MantenimientoModule } from '../mantenimiento/mantenimiento.module.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'hotel-manager-rep3',
    }),
    // Módulos del hotel
    HabitacionesModule,
    HuespedesModule,
    ReservasModule,
    MantenimientoModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}