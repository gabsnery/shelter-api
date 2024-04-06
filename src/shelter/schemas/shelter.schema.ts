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
  createAt: Date;
  @Prop({ require: true })
  updateAt: Date;
}

export const ShelterSchema = SchemaFactory.createForClass(Shelter);
