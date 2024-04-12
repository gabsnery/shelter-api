import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import IPetRepository from '../intefaces/pet.repository.interface';
import PetTokens from '../pet.tokens';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/errors/pet.not.found.error';
import { Injectable } from '@nestjs/common';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.service.interface';
import GetPetsUseCaseInput from './dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './dtos/get.pets.usecase.output';
import PetResponse from '../dtos/pet.response';

@Injectable()
export default class GetPetsUseCase
  implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
    const pets = await this.petRepository.get({ ...input });

    const petPhotos = await Promise.all(
      pets.items.map(async (pet) => {
        const petPhoto = !!pet.photo
          ? (await this.fileService.readFile(pet.photo)).toString('base64')
          : null;
        return {...PetResponse.fromPet(pet),photo:petPhoto};
      }),
    );

    return new GetPetsUseCaseOutput({
      totalPage: Math.ceil(pets.total / input.itemsPetPage),
      currentPage: input.page,
      items: petPhotos,
    });
  }
}
