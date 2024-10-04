import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto, ResponseTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoStatus } from './todo.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<ResponseTodoDto>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<ResponseTodoDto> {
    return this.todoModel.create({
      ...createTodoDto,
      status: TodoStatus.TODO,
    });
  }

  async findAll(): Promise<ResponseTodoDto[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: string): Promise<ResponseTodoDto> {
    return this.todoModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseTodoDto> {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}
