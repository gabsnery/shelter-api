import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IPetRepository from './intefaces/pet.repository.interface';
import { Pet } from './schemas/pet.schema';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';

@Injectable()
export class PetRepository implements IPetRepository {
  constructor(
    @InjectModel(Pet.name)
    private readonly petModel: Model<Pet>,
  ) {}

  async create(data: Partial<Pet>): Promise<Pet> {
    return await this.petModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getById(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).lean();
    return pet;
  }

  async get(data: GetPetsUseCaseInput): Promise<Pet[]> {
    console.log("🚀 ~ PetRepository ~ get ~ data:", data)
    console.log('entrou aqiu')
    const etste = await this.petModel.find({ type: data.type }).lean();
    console.log("🚀 ~ PetRepository ~ get ~ etste:", etste)
    return etste
  }

  async update(data: Partial<Pet>): Promise<void> {
    await this.petModel
      .findByIdAndUpdate(data._id, {
        ...data,
        updatedAt: new Date(),
      })
      .lean();
  }
  async delete(data: string): Promise<void> {
    await this.petModel.findByIdAndDelete(data);
  }

  /*   async update(data: Pet): Promise<Pet> {
    return await this.petModel.findByIdAndUpdate(data._id,{
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
 */
}
