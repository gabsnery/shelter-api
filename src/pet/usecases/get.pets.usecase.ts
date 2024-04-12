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
      pets.map(async (pet) => {
        const petPhoto = !!pet.photo
          ? (await this.fileService.readFile(pet.photo)).toString('base64')
          : null;
        return {
          ...pet,
          /* photo: petPhoto, */
          id: pet._id,
        };
      }),
    );
    const items=[...petPhotos].slice(
      (input.page-1) * input.itemsPetPage,
      (input.page-1) * input.itemsPetPage + input.itemsPetPage,
    )
    console.log("🚀 ~ run ~ items:", items)
    console.log("🚀 ~ run ~ input.page * input.itemsPetPage:", input.page * input.itemsPetPage)
    console.log("🚀 ~ run ~ input.page * input.itemsPetPage + input.itemsPetPage:", input.page * input.itemsPetPage + input.itemsPetPage)
    
    const totalPage = Math.ceil(pets.length / input.itemsPetPage);
    return new GetPetsUseCaseOutput({
      totalPage: totalPage,
      currentPage: input.page,
      items: items,
    });
  }
}
