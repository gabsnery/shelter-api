import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IShelterRepository from './intefaces/shelter.repository.interface';
import { Shelter } from './schemas/shelter.schema';

@Injectable()
export class ShelterRepository implements IShelterRepository {
  constructor(
    @InjectModel(Shelter.name)
    private readonly shelterModel: Model<Shelter>,
  ) {}

  async get(): Promise<Shelter> {
    const re = await this.shelterModel.findOne().lean();
    console.log('🚀 ~ get ~ re:', re);
    return re;
  }

  async update(data: Partial<Shelter>): Promise<void> {
    await this.shelterModel
      .findOneAndUpdate(null, {
        ...data,
        updatedAt: new Date(),
      })
      .lean();
  }
}
