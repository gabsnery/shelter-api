import { IUseCase } from 'src/domain/iusecase.interface';
import getShelterDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';
import { Inject } from '@nestjs/common';
import ShelterTokens from '../shelter.tokens';
import IShelterRepository from '../intefaces/shelter.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GetShelterDetailsUseCase
  implements IUseCase<null, getShelterDetailsUseCaseOutput>
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: IShelterRepository,
  ) {}

  async run(input: null): Promise<getShelterDetailsUseCaseOutput> {
    const shelter = await this.shelterRepository.get();
    return new getShelterDetailsUseCaseOutput({
      shelterName: shelter.name,
      shelterWhatsApp: shelter.whatsApp,
      shelterEmail: shelter.email,
      shelterPhone: shelter.phone,
      createdAt: shelter.createdAt,
      updatedAt: shelter.updatedAt,
    });
  }
}
