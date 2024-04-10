import {
  Body,
  Get,
  Controller,
  Inject,
  Post,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdPetUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdPetUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {
  @Inject(PetTokens.createPetUseCase)
  private readonly createPetUseCase: IUseCase<
    CreatePetUseCaseInput,
    CreatePetUseCaseOutput
  >;

  @Inject(PetTokens.getPetByIdPetUseCase)
  private readonly getPetByIdPetUseCase: IUseCase<
    GetPetByIdPetUseCaseInput,
    GetPetByIdPetUseCaseOutput
  >;

  @Get(':id')
  async getPetById(@Param('id') id: string) {
    try {
      const useCaseInput = new GetPetByIdPetUseCaseInput({ id });
      return await this.getPetByIdPetUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Post()
  async createPet(
    @Body() input: CreatePetUseCaseInput,
  ): Promise<CreatePetUseCaseOutput> {
    const useCaseInput = new CreatePetUseCaseInput({ ...input });
    return await this.createPetUseCase.run(useCaseInput);
  }
}
