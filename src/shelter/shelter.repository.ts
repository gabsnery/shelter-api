import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IShelterRepository from './intefaces/shelter.repository.interface';
import { Shelter } from './schemas/shelter.schema';

@Injectable()
export class ShelterRepository implements IShelterRepository{
  constructor(
    @InjectModel(Shelter.name)
    private readonly shelterModel: Model<Shelter>,
  ) {}

  async get():Promise<Shelter>{
    return await this.shelterModel.findOne()
  }

  async update(val:Partial<Shelter>):Promise<Shelter>{
    console.log("🚀 ~ ShelterRepository ~ get ~ this.shelterMode:", val)
   const test =this.shelterModel.findOneAndUpdate({},{val})
    console.log("🚀 ~ ShelterRepository ~ update ~ test:", test)
    return await this.shelterModel.findOne()
  }
}
