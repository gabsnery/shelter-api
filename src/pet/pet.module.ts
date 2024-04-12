import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import PetTokens from './pet.tokens';
import { Pet, PetSchema } from './schemas/pet.schema';
import CreatePetUseCase from './usecases/create.pet.usecase';
import GetPetByIdPetUseCase from './usecases/get.pet.by.id.usecase';
import UpdatePetUseCase from './usecases/update.pet.usecase';
import DeletePetUseCase from './usecases/delete.pet.usecase';
import AppTokens from 'src/app.tokens';
import FileService from 'src/file.service';
import UpdatePetPhotoByIdUseCase from './usecases/update.photo.pet.by.id.usecase';

@Module({
  controllers: [PetController],
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
  ],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase,
    },
    {
      provide: PetTokens.getPetByIdPetUseCase,
      useClass: GetPetByIdPetUseCase,
    },
    {
      provide: PetTokens.updatePetUseCase,
      useClass: UpdatePetUseCase,
    },
    {
      provide: PetTokens.deletePetUseCase,
      useClass: DeletePetUseCase,
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository,
    },
    {
      provide: PetTokens.updatePetPhotoByIdUseCase,
      useClass: UpdatePetPhotoByIdUseCase
    },
    {
      provide: AppTokens.fileService,
      useClass: FileService,
    },
  ]
})
export class PetModule {}
