import * as nestCommon from '@nestjs/common';
import { UserRole } from '../shared/enum';
import { Roles } from './auth.decorator';

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn(null),
}));

describe('Roles decorator', () => {
  (
    nestCommon.SetMetadata as jest.MockedFunction<typeof nestCommon.SetMetadata>
  ).mockResolvedValue([] as any as never);

  test('roles decorator is called', () => {
    Roles(UserRole.ADMIN);
    expect(nestCommon.SetMetadata).toHaveBeenCalled();
  });
});
