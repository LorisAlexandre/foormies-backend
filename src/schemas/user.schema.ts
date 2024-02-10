import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

export const UserSettingsSchema = new mongoose.Schema({});

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: UserSettingsSchema, required: false, default: () => ({}) })
  settings: typeof UserSettingsSchema;

  _id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
