import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitacioneDto } from './create-habitacione.dto.js';

export class UpdateHabitacioneDto extends PartialType(CreateHabitacioneDto) {}
