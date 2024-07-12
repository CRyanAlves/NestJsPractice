import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async getAllUsers() {
    return this.userService.list();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.updatePut(id, data);
  }

  @Patch(':id')
  async partialUpdateUser(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.updatePatch(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
