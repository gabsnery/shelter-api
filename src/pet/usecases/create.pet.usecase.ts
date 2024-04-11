import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import CreatePetUseCaseInput from './dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './dtos/create.pet.usecase.output';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CreatePetUseCase
  implements
    IUseCase<
      CreatePetUseCaseInput,
      CreatePetUseCaseOutput
    >
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}


  async run(input: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {
    const pet = await this.petRepository.create({ ...input });
    return new CreatePetUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: pet.photo,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    });
  }
}
