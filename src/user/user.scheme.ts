import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 定义用户模型
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  height: number;

  @Prop()
  password:string

  @Prop()
  role:string
}

export const UserSchema = SchemaFactory.createForClass(User);
