import {
  Body,
  Get,
  Controller,
  Inject,
  Post,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdPetUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdPetUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetUseCaseOutput from './usecases/dtos/update.pet.usecase.output';
import UpdatePetUseCaseInput from './usecases/dtos/update.pet.usecase.input';
import { Delete } from '@nestjs/common';
import DeletePetUseCaseInput from './usecases/dtos/delete.pet.usecase.input';
import DeletePetUseCaseOutput from './usecases/dtos/delete.pet.usecase.output';

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

  @Inject(PetTokens.updatePetUseCase)
  private readonly updatePetUseCase: IUseCase<
    UpdatePetUseCaseInput,
    UpdatePetUseCaseOutput
  >;

  @Inject(PetTokens.deletePetUseCase)
  private readonly deletePetUseCase: IUseCase<
    DeletePetUseCaseInput,
    DeletePetUseCaseOutput
  >;

  @Post()
  async createPet(
    @Body() input: CreatePetControllerInput,
  ): Promise<CreatePetUseCaseOutput> {
    const useCaseInput = new CreatePetUseCaseInput({ ...input });
    return await this.createPetUseCase.run(useCaseInput);
  }

  @Get(':id')
  async getPetById(@Param('id') id: string) {
    try {
      const useCaseInput = new GetPetByIdPetUseCaseInput({ id });
      return await this.getPetByIdPetUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Put(':id')
  async updatePet(
    @Body() input: UpdatePetControllerInput,
    @Param('id') id: string,
  ): Promise<UpdatePetUseCaseOutput> {
    try {
      const useCaseInput = new UpdatePetUseCaseInput({ ...input, id });
      return await this.updatePetUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }
  @Delete(':id')
  async deletePet(@Param('id') id: string): Promise<DeletePetUseCaseOutput> {
    
    try {
    const useCaseInput = new UpdatePetUseCaseInput({ id });
    return await this.deletePetUseCase.run(useCaseInput);
    } catch (error) {
        throw new BadRequestException(JSON.parse(error.message));
      }
  }
}
