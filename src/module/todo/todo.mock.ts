import { CreateTodoDto, ResponseTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoStatus } from './todo.enum';

export const mockTodoId = '1234';

export const mocCreateTodoDto: CreateTodoDto = {
  title: 'title',
  description: 'description',
};

export const mockUpdateTodoDto: UpdateTodoDto = {
  title: 'title update',
  description: 'description update',
  status: TodoStatus.IN_PROGRESS,
};

export const mockResponseTodoDto: ResponseTodoDto = {
  id: mockTodoId,
  title: 'title response',
  description: 'description response',
  status: TodoStatus.IN_PROGRESS,
  createdAt: new Date('2023-05-22T15:27:54.725Z'),
  updatedAt: new Date('2023-05-22T15:27:54.725Z'),
};
