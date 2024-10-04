import { UserRole } from '../../shared/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: UserRole.USER })
  roles: [];
}

export const UserSchema = SchemaFactory.createForClass(User);

// another declare TodoSchema
// export const UserSchema = new mongoose.Schema(
//   {
//     username: String,
//     password: String,
//     roles: { type: [], default: [UserRole.USER] },
//   },
//   {
//     timestamps: true,
//   },
// );
