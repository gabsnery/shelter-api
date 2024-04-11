import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import UpdatePetUseCaseInput from './dtos/update.pet.usecase.input';
import UpdatePetUseCaseOutput from './dtos/update.pet.usecase.output';
import updateShelterDetailsUseCaseOutput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.output';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';

@Injectable()
export default class UpdatePetUseCase
  implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput> {
    await this.petRepository.update({...input,_id:input.id});
    const pet = await this.getPetById(input.id);
    if (!pet) new PetNotFoundError();
    return new UpdatePetUseCaseOutput(pet);
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
