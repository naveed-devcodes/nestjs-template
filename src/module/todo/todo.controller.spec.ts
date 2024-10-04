import { TodoController } from './todo.controller';
import { UpdateTodoDto } from './todo.dto';
import { mocCreateTodoDto, mockResponseTodoDto, mockTodoId } from './todo.mock';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let todoRepository;
  let todoService;
  let todoController;
  beforeAll(() => {
    todoService = new TodoService(todoRepository);
    jest.spyOn(todoService, 'create').mockImplementation((todo) => {
      return mockResponseTodoDto;
    });
    jest.spyOn(todoService, 'findAll').mockImplementation((todo) => {
      return [mockResponseTodoDto];
    });
    jest.spyOn(todoService, 'findById').mockImplementation((todo) => {
      return mockResponseTodoDto;
    });
    jest.spyOn(todoService, 'update').mockImplementation((todo) => {
      return mockResponseTodoDto;
    });
    jest.spyOn(todoService, 'delete').mockImplementation((todo) => void {});
    todoController = new TodoController(todoService);
  });

  describe('create', () => {
    it('should create a todo', async () => {
      expect(await todoController.create(mocCreateTodoDto)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      expect(await todoController.findAll()).toStrictEqual([
        mockResponseTodoDto,
      ]);
    });
  });

  describe('findById', () => {
    it('should return a todo', async () => {
      expect(await todoController.findById(mockTodoId)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      expect(await todoController.update(mockTodoId, UpdateTodoDto)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('delete', () => {
    it('should remove a todo', async () => {
      await todoController.delete(mockTodoId);
      expect(todoService.delete).toHaveBeenCalled();
    });
  });
});
