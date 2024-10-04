import { TodoRepository } from './todo.repository';
import {
  mocCreateTodoDto,
  mockResponseTodoDto,
  mockTodoId,
  mockUpdateTodoDto,
} from './todo.mock';

// setup
// run test
// assert
describe('TodoRepository', () => {
  let todoModel;
  let todoRepository;

  beforeAll(() => {
    todoModel = {
      create: () => null,
      find: () => null,
      findById: () => null,
      findByIdAndUpdate: () => null,
      findByIdAndDelete: () => null,
    };
    todoRepository = new TodoRepository(todoModel);
  });

  describe('create', () => {
    it('should create a todo', async () => {
      // setup
      const spyOnCreate = jest.spyOn(todoModel, 'create');

      // run test
      await todoRepository.create(mocCreateTodoDto);

      // assert
      expect(spyOnCreate).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      // setup
      const spyOnFind = jest
        .spyOn(todoModel, 'find')
        .mockImplementationOnce(() => {
          return {
            exec: () => mockResponseTodoDto,
          };
        });

      // run test
      await todoRepository.findAll();

      // assert
      expect(spyOnFind).toBeCalled();
    });
  });

  describe('findById', () => {
    it('should return a todo', async () => {
      // setup & mock
      jest.spyOn(todoModel, 'findById').mockImplementationOnce(() => {
        return {
          exec: () => mockResponseTodoDto,
        };
      });

      // assert
      expect(await todoRepository.findById(mockTodoId)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('update', () => {
    it('should update a todo by todoId', async () => {
      // setup & mock
      jest.spyOn(todoModel, 'findByIdAndUpdate').mockImplementationOnce(() => {
        return {
          exec: () => mockResponseTodoDto,
        };
      });

      // assert
      expect(await todoRepository.update(mockTodoId, mockUpdateTodoDto)).toBe(
        mockResponseTodoDto,
      );
    });
  });

  describe('delete', () => {
    it('should remove a todo by todoId', async () => {
      // setup & mock
      jest.spyOn(todoModel, 'findByIdAndDelete').mockImplementation(() => {
        return {
          exec: () => mockResponseTodoDto,
        };
      });
      await todoRepository.delete(mockTodoId);

      // assert
      expect(todoModel.findByIdAndDelete).toBeCalled();
    });
  });
});
