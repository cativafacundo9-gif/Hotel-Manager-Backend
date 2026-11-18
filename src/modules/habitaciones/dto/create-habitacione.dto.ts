import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean, IsOptional } from 'class-validator';

export class CreateHabitacioneDto {
  @IsString()
  @IsNotEmpty({ message: 'El número de habitación es obligatorio' })
  numero: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de habitación es obligatorio (ej. Simple, Doble, Suite)' })
  tipo: string;

  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  precio: number;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}