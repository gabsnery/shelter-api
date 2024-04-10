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

  async get(): Promise<Omit<Shelter, '_id'>> {
    const shelter = await this.shelterModel.findOne().lean();
    return shelter;
  }

  async update(data: Partial<Shelter>): Promise<Shelter> {
    await this.shelterModel
      .findOneAndUpdate(null, {
        ...data,
        updatedAt: new Date(),
      })
      .lean();
    const shelter = await this.shelterModel.findOne().lean();
    delete shelter['_id']
    return shelter
  }
}
