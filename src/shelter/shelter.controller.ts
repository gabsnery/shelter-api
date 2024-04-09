import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import UpdateShelterControlerInput from './dtos/update.shelter.controller.input';
import ShelterTokens from './shelter.tokens';
import getShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import updateShelterDetailsUseCaseOutput from './usecases/dtos/update.shelter.details.usecase.output';
import UpdateShelterDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.input';

@Controller('shelter')
export class ShelterController {
  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly getShelterDetailsUseCase: IUseCase<
    null,
    getShelterDetailsUseCaseOutput
  >;

  @Inject(ShelterTokens.updateShelterDetailsUseCase)
  private readonly updateShelterDetailsUseCase: IUseCase<
    UpdateShelterDetailsUseCaseInput,
    updateShelterDetailsUseCaseOutput
  >;

  @Get()
  async getShelterDetails(): Promise<getShelterDetailsUseCaseOutput> {
    return await this.getShelterDetailsUseCase.run(null);
  }

  /*   @Put()
  async updateShelterDetails(@Body() input: UpdateShelterControlerInput){
    return await this.getShelterDetailsUseCase.run(null)
  } */

  @Put()
  async updateShelterDetails(
    @Body() input: UpdateShelterControlerInput,
  ): Promise<updateShelterDetailsUseCaseOutput> {
    const useCaseInput = new UpdateShelterDetailsUseCaseInput({ ...input });
    return await this.updateShelterDetailsUseCase.run(useCaseInput);
  }
}

// return new getShelterDetailsUseCaseOutput({
//   shelterName:'Acãochego',
//   shelterWhatsapp:'15998550238',
//   shelterEmail:'Acãochego@gmail.com',
//   shelterPhone:'15998550238',
//   createdAt:new Date(),
//   updatedAt:new Date()
