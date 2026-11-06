import { PartialType } from '@nestjs/mapped-types';
import { CreateHuespedeDto } from './create-huespede.dto.js';

export class UpdateHuespedeDto extends PartialType(CreateHuespedeDto) {}
