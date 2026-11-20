import { Module } from '@nestjs/common';
import { HuespedesService } from './huespedes.service.js';
import { HuespedesController } from './huespedes.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [HuespedesController],
  providers: [HuespedesService],
})
export class HuespedesModule {}