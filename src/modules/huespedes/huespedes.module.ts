import { Module } from '@nestjs/common';
import { HuespedesService } from './huespedes.service.js';
import { HuespedesController } from './huespedes.controller.js';

@Module({
  controllers: [HuespedesController],
  providers: [HuespedesService],
})
export class HuespedesModule {}
