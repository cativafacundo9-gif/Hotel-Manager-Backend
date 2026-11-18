import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateHuespedDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
}