import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;

@Schema({
  versionKey: false,
  collection: 'countries',
})
export class Country {
  @Prop({ required: true, unique: true, type: String })
  country: string;

  @Prop({ required: true, unique: true, type: String })
  flag: string;

  // name of file from flag, by this field we can delete the file in s3
  @Prop({ required: true, unique: true, type: String })
  key: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
