import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import GetPetByIdPetUseCaseInput from './dtos/get.pet.by.id.usecase.input';
import GetPetByIdPetUseCaseOutput from './dtos/get.pet.by.id.usecase.output';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';

export default class GetPetByIdPetUseCase
  implements IUseCase<GetPetByIdPetUseCaseInput, GetPetByIdPetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(
    input: GetPetByIdPetUseCaseInput,
  ): Promise<GetPetByIdPetUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (pet === null) new PetNotFoundError();
    return new GetPetByIdPetUseCaseOutput({ ...pet });
  }

  private async getPetById(id: string): Promise<Pet> {
    try {
      const pet = await this.petRepository.getById(id);
      return pet;
    } catch (error) {
      return null;
    }
  }
}
