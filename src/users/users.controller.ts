import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createOneUser(
    @Body('name') name: string,
    @Body('surname') surname: string,
    @Body('points') points: number,
  ) {
    const generatedId = await this.usersService.createOneUser(
      name,
      surname,
      points,
    );
    return { id: generatedId };
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') userId: string) {
    return this.usersService.getOneUser(userId);
  }

  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('surname') userSurname: string,
    @Body('points') userPoints: number,
  ) {
    this.usersService.updateUser(userId, userName, userSurname, userPoints);
    return null;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.usersService.deleteUser(userId);
    return null;
  }
}
