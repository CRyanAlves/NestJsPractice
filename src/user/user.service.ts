import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateUserDTO) {
    data.password = data.password;
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prismaService.user.create({
      data,
    });
  }

  async list() {
    return this.prismaService.user.findMany();
  }

  async show(id: number) {
    await this.existUser(id);
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async updatePut(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.existUser(id);

    password = password;
    password = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prismaService.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: { id },
    });
  }

  async updatePatch(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    const data: any = {};
    await this.existUser(id);

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = data.password;
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }

    if (role) {
      data.role = role;
    }

    return this.prismaService.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.existUser(id);

    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async existUser(id: number) {
    if (!(await this.prismaService.user.count({ where: { id } }))) {
      throw new NotFoundException(`O Usuário ${id} não encontrado`);
    }
  }
}
