import { Test, TestingModule } from '@nestjs/testing';
import { HabitacionesService } from './habitaciones.service.js';

describe('HabitacionesService', () => {
  let service: HabitacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitacionesService],
    }).compile();

    service = module.get<HabitacionesService>(HabitacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
