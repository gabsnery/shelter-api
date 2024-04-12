import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import GetPetByIdPetUseCaseInput from './dtos/get.pet.by.id.usecase.input';
import GetPetByIdPetUseCaseOutput from './dtos/get.pet.by.id.usecase.output';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';
import { Injectable } from '@nestjs/common';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.service.interface';

@Injectable()
export default class GetPetByIdPetUseCase
  implements IUseCase<GetPetByIdPetUseCaseInput, GetPetByIdPetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(
    input: GetPetByIdPetUseCaseInput,
  ): Promise<GetPetByIdPetUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (pet === null) new PetNotFoundError();
    const petPhoto = !!pet.photo
      ? (await this.fileService.readFile(pet.photo)).toString('base64')
      : null;
    return new GetPetByIdPetUseCaseOutput({
      ...pet,
      id: pet._id,
      photo: petPhoto,
    });
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
