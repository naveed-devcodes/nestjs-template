import {
  mockCreateUserDto,
  mockHash,
  mockResponseUserDto,
  mockUserId,
  mockUsername,
} from './user.mock';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => {
    return mockHash;
  }),
}));
bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;

describe('UserService', () => {
  let userModel;
  let userRepository;
  let userService;

  beforeAll(() => {
    userRepository = new UserRepository(userModel);
    jest
      .spyOn(userRepository, 'create')
      .mockImplementation((user) =>
        Promise.resolve(mockResponseUserDto as any),
      );
    jest
      .spyOn(userRepository, 'findAll')
      .mockResolvedValue([mockResponseUserDto]);
    jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue(mockResponseUserDto);
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue(mockResponseUserDto);
    userService = new UserService(userRepository);
  });

  describe('create', () => {
    it('should create a user', async () => {
      expect(await userService.create(mockCreateUserDto)).toBe(
        mockResponseUserDto,
      );
    });
  });

  describe('findOne', () => {
    it('should create a user', async () => {
      expect(await userService.findOne(mockUsername)).toBe(mockResponseUserDto);
    });
  });

  describe('findById', () => {
    it('should create a user', async () => {
      expect(await userService.findById(mockUserId)).toBe(mockResponseUserDto);
    });
  });

  describe('generateHash', () => {
    it('should generate a hash', async () => {
      expect(await userService.generateHash(mockUserId)).toBe(mockHash);
    });
  });
});
