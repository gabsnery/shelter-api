import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IPetRepository from './intefaces/pet.repository.interface';
import { Pet } from './schemas/pet.schema';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import FindByFilterAndTotal from './usecases/dtos/find.by.filter.and.total.pet.usecase.output';

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

  async get(data: GetPetsUseCaseInput): Promise<FindByFilterAndTotal> {
    const skip = data.itemsPetPage * (data.page - 1);
    let query = this.petModel.find();

    if (data.type) query = query.find({ type: data.type });
    if (data.size) query = query.find({ type: data.size });
    if (data.gender) query = query.find({ type: data.gender });

    const totalQuery = query.clone().countDocuments();
    const skipQuery = query.clone().skip(skip).limit(data.itemsPetPage);

    const [items, total] = await Promise.all([
      skipQuery.exec(),
      totalQuery.exec(),
    ]);
    return new FindByFilterAndTotal({items,total})
    /*     const etste = await this.petModel.find({ type: data.type }).lean();
    return etste; */
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
