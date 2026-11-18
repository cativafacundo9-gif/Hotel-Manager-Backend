import { IsNumber, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  @IsNotEmpty()
  huespedId: number;

  @IsNumber()
  @IsNotEmpty()
  habitacionId: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}