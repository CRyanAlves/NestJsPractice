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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/Role.guard';
import { AuthGuard } from 'src/guards/Auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
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
  async getUserById(@ParamId() id) {
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
