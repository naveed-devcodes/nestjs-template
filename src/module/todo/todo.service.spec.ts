import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import {
  mocCreateTodoDto,
  mockResponseTodoDto,
  mockTodoId,
  mockUpdateTodoDto,
} from './todo.mock';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoModel;
  let todoRepository;
  let todoService: TodoService;
  beforeAll(() => {
    todoRepository = new TodoRepository(todoModel);
    jest
      .spyOn(todoRepository, 'create')
      .mockImplementation((todo: CreateTodoDto) => {
        return Promise.resolve(mockResponseTodoDto);
      });
    jest.spyOn(todoRepository, 'findAll').mockImplementation(() => {
      return Promise.resolve([mockResponseTodoDto]);
    });
    jest.spyOn(todoRepository, 'findById').mockImplementation((id: string) => {
      return Promise.resolve(mockResponseTodoDto);
    });
    jest
      .spyOn(todoRepository, 'update')
      .mockImplementation((id: string, todo: UpdateTodoDto) => {
        return Promise.resolve(mockResponseTodoDto);
      });
    jest
      .spyOn(todoRepository, 'delete')
      .mockImplementation((id: string) => void {});
    todoService = new TodoService(todoRepository);
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      expect(await todoService.create(mocCreateTodoDto)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      expect(await todoService.findAll()).toStrictEqual([mockResponseTodoDto]);
    });
  });

  describe('findById', () => {
    it('should return a todo', async () => {
      expect(await todoService.findById(mockTodoId)).toBe(mockResponseTodoDto);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      expect(await todoService.update(mockTodoId, mockUpdateTodoDto)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      await todoService.delete(mockTodoId);
      expect(todoRepository.delete).toHaveBeenCalled();
    });
  });
});
