import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';

const userPublicSelect = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.usuario.create({
      data: {
        nombre: createUserDto.nombre,
        email: createUserDto.email,
        password: hashedPassword,
        rol: createUserDto.rol ?? 'USER',
      },
      select: userPublicSelect,
    });
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      select: userPublicSelect,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: userPublicSelect,
    });

    if (!user) {
      throw new NotFoundException(`El usuario #${id} no existe.`);
    }

    return user;
  }
}