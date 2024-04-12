import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import UpdatePetUseCaseInput from './dtos/update.pet.usecase.input';
import UpdatePetUseCaseOutput from './dtos/update.pet.usecase.output';
import updateShelterDetailsUseCaseOutput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.output';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.service.interface';

@Injectable()
export default class UpdatePetUseCase
  implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (!pet) new PetNotFoundError();
    const petPhoto = !!pet.photo
      ? (await this.fileService.readFile(pet.photo)).toString('base64')
      : null;
    await this.petRepository.update({ ...input, _id: input.id });
    return new UpdatePetUseCaseOutput({ ...pet, photo: petPhoto });
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
