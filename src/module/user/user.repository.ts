import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserDto, ResponseUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userModel.create({
      ...createUserDto,
    });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<ResponseUserDto> {
    return this.userModel.findById(id).exec();
  }

  async findOne(username: string): Promise<ResponseUserDto> {
    return this.userModel.findOne({ username }).exec();
  }
}
