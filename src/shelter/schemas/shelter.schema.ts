import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShelterDocument = HydratedDocument<Shelter>;

@Schema({ versionKey: false })
export class Shelter {
  @Prop({ require: true })
  name: string;
  @Prop({ require: true })
  whatsApp: string;
  @Prop({ require: true })
  phone: string;
  @Prop({ require: true })
  email: string;
  @Prop({ require: true })
  createdAt: Date;
  @Prop({ require: true })
  updatedAt: Date;
}

export const ShelterSchema = SchemaFactory.createForClass(Shelter);
