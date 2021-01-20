import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create One User
   *
   * @param name
   * @param surname
   * @param points
   */
  async createOneUser(name: string, surname: string, points: number) {
    const newUser = new this.userModel({
      name,
      surname: surname,
      points,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  /**
   * Get All Users
   */
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      points: user.points,
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      points: user.points,
    };
  }

  async updateUser(
    userId: string,
    name: string,
    surname: string,
    points: number,
  ) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    if (name) modUser.name = name;
    if (surname) modUser.surname = surname;
    if (points) modUser.points = points;

    modUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
