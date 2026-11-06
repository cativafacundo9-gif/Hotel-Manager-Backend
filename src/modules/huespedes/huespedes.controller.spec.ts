import { Test, TestingModule } from '@nestjs/testing';
import { HuespedesController } from './huespedes.controller.js';
import { HuespedesService } from './huespedes.service.js';

describe('HuespedesController', () => {
  let controller: HuespedesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HuespedesController],
      providers: [HuespedesService],
    }).compile();

    controller = module.get<HuespedesController>(HuespedesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
