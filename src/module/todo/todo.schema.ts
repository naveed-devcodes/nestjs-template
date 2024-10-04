import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo).set(
  'timestamps',
  true,
);

// another declare TodoSchema

// export const TodoSchema = new mongoose.Schema(
//   {
//     title: String,
//     description: String,
//     status: String,
//   },
//   {
//     timestamps: true,
//   },
// );
