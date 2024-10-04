import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { UserRepository } from './user.repository';
import {
  mockCreateUserDto,
  mockResponseUserDto,
  mockUserId,
  mockUsername,
} from './user.mock';

describe('UserRepository', () => {
  let userModel;
  let userRepository: UserRepository;

  beforeEach(() => {
    userModel = {
      create: () => null,
      find: () => null,
      findById: () => null,
      findOne: () => null,
    };

    jest.spyOn(userModel, 'create').mockImplementation(() => {
      return mockResponseUserDto;
    });
    jest.spyOn(userModel, 'find').mockImplementation(() => {
      return {
        exec: () => [mockResponseUserDto],
      };
    });
    jest.spyOn(userModel, 'findById').mockImplementation(() => {
      return {
        exec: () => mockResponseUserDto,
      };
    });
    jest.spyOn(userModel, 'findOne').mockImplementation(() => {
      return {
        exec: () => mockResponseUserDto,
      };
    });
    userRepository = new UserRepository(userModel);
  });

  describe('create', () => {
    it('should create a user', async () => {
      await userRepository.create(mockCreateUserDto);
      expect(userModel.create).toBeCalled();
    });
  });
  describe('findAll', () => {
    it('should return an array', async () => {
      expect(await userRepository.findAll()).toStrictEqual([
        mockResponseUserDto,
      ]);
    });
  });
  describe('findById', () => {
    it('should return a user', async () => {
      expect(await userRepository.findById(mockUserId)).toStrictEqual(
        mockResponseUserDto,
      );
    });
  });
  describe('findOne', () => {
    it('should return a user', async () => {
      expect(await userRepository.findOne(mockUsername)).toStrictEqual(
        mockResponseUserDto,
      );
    });
  });
});
