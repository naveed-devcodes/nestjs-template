import { UserRole } from '../../shared/enum';
import { CreateUserDto, ResponseUserDto } from './user.dto';

export const mockUserId = 'abc';
export const mockUsername = 'h3it';
export const mockHash = 'abcxyz';

export const mockCreateUserDto: CreateUserDto = {
  username: 'h3it',
  password: '123456',
  roles: [UserRole.ADMIN],
};

export const mockResponseUserDto: ResponseUserDto = {
  id: 'abc',
  username: 'h3it',
  password: '123456',
  roles: [UserRole.ADMIN],
  createdAt: new Date('2023-05-22T15:27:54.725Z'),
  updatedAt: new Date('2023-05-22T15:27:54.725Z'),
};
