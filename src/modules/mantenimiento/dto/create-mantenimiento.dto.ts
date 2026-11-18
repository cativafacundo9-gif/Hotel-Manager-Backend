import { IsString, IsNumber, IsNotEmpty, IsIn } from 'class-validator';

export class CreateMantenimientoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsIn(['Pendiente', 'Resuelto']) // Valida que solo acepte estos dos valores exactos
  estado: string;

  @IsNumber()
  @IsNotEmpty()
  habitacionId: number;
}