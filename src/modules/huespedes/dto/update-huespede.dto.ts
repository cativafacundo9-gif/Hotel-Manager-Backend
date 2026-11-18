import { PartialType } from '@nestjs/mapped-types';
import { CreateHuespedDto } from './create-huespede.dto.js';

export class UpdateHuespedDto extends PartialType(CreateHuespedDto) {}