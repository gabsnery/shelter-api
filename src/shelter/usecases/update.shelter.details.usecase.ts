import { IUseCase } from 'src/domain/iusecase.interface';
import updateShelterDetailsUseCaseInput from './dtos/update.shelter.details.usecase.input';
import updateShelterDetailsUseCaseOutput from './dtos/update.shelter.details.usecase.output';
import { Inject } from '@nestjs/common';
import ShelterTokens from '../shelter.tokens';
import IShelterRepository from '../intefaces/shelter.repository.interface';
export default class UpdateShelterDetailsUseCase
  implements
    IUseCase<
      updateShelterDetailsUseCaseInput,
      updateShelterDetailsUseCaseOutput
    >
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: IShelterRepository,
  ) {}

  async run(
    input: updateShelterDetailsUseCaseInput,
  ): Promise<updateShelterDetailsUseCaseOutput> {
    await this.shelterRepository.update(input);
    const shelter = await this.shelterRepository.get();
    return new updateShelterDetailsUseCaseOutput(shelter);
  }
}
