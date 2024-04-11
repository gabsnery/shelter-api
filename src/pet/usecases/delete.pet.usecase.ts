import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';
import DeletePetUseCaseInput from './dtos/delete.pet.usecase.input';
import DeletePetUseCaseOutput from './dtos/delete.pet.usecase.output';

@Injectable()
export default class DeletePetUseCase
  implements IUseCase<DeletePetUseCaseInput, DeletePetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(input: DeletePetUseCaseInput): Promise<DeletePetUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (pet === null) new PetNotFoundError();
    await this.petRepository.delete(input.id);

    return new DeletePetUseCaseOutput();
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
