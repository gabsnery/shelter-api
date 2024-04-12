import {
  Body,
  Get,
  Controller,
  Inject,
  Post,
  Param,
  Put,
  BadRequestException,
  HttpCode,
  Delete,
  Patch,
  Query,
  HttpStatus,
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
import DeletePetUseCaseInput from './usecases/dtos/delete.pet.usecase.input';
import DeletePetUseCaseOutput from './usecases/dtos/delete.pet.usecase.output';
import { UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.by.id.usecase.output';
import multerConfig from 'src/config/multer.config';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './usecases/dtos/get.pets.usecase.output';

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
  @Inject(PetTokens.getPetsUseCase)
  private readonly getPetsUseCase: IUseCase<
    GetPetsUseCaseInput,
    GetPetsUseCaseOutput
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

  @Inject(PetTokens.updatePetPhotoByIdUseCase)
  private readonly updatePetPhotoByIdUseCase: IUseCase<
    UpdatePetPhotoByIdUseCaseInput,
    UpdatePetPhotoByIdUseCaseOutput
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
  @Get()
  async getPets(
    @Query('type') type?: string,
    @Query('size') size?: string,
    @Query('gender') gender?: string,
    @Query('page') page?: string,
    @Query('itemsPetPage') itemsPetPage?: string,
  ) {
    const FIRST_PAGE = 1;
    const DEFAULT_ITENS_PER_PAGE = 10;
    const useCaseInput = new GetPetsUseCaseInput({
      type: !!type ? type : null,
      size: !!size ? size : null,
      gender: !!gender ? gender : null,
      page: !!page ? +page : FIRST_PAGE,
      itemsPetPage: !!itemsPetPage ? +itemsPetPage : DEFAULT_ITENS_PER_PAGE,
    });
    return await this.getPetsUseCase.run(useCaseInput);
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

  /*   @Patch()
  async updatePetPhoto(@File() photo: File): Promise<void> {} */

  /*   @Patch('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  } */

  @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    try {
      const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
        id,
        photoPath: photo.path,
      });
      return await this.updatePetPhotoByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }
}
