import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import CreatePetUseCase from './usecases/create.pet.usecase';
import PetTokens from './pet.tokens';
import { PetRepository } from './pet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import GetPetByIdPetUseCase from './usecases/get.pet.by.id.usecase';

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
      provide: PetTokens.petRepository,
      useClass: PetRepository,
    },
  ]
})
export class PetModule {}
