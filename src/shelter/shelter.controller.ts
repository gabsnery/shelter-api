import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import getShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterControlerInput from './dtos/update.shelter.controller.input';

@Controller('shelter')
export class ShelterController {

  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly GetShelterDetailsUseCase: IUseCase<null, getShelterDetailsUseCaseOutput>

  @Get()
  async getShelterDetails():Promise<getShelterDetailsUseCaseOutput>{
    return await this.GetShelterDetailsUseCase.run(null)
  }

  @Patch()
  async updateShelterDetails(@Body() input: UpdateShelterControlerInput){
    console.log(input)
  }
}


// return new getShelterDetailsUseCaseOutput({
//   shelterName:'Acãochego',
//   shelterWhatsapp:'15998550238',
//   shelterEmail:'Acãochego@gmail.com',
//   shelterPhone:'15998550238',
//   createAt:new Date(),
//   updateAt:new Date()