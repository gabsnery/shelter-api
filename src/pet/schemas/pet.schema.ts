import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ versionKey: false })
export class Pet {
  @Prop({ required: true, auto: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  type: string;

  @Prop({ require: true })
  size: string;

  @Prop({ require: true })
  gender: string;

  @Prop({ require: false, default: null })
  photo: string;

  @Prop({ require: true })
  bio: string;

  @Prop({ require: true })
  createdAt: Date;

  @Prop({ require: true })
  updatedAt: Date;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
