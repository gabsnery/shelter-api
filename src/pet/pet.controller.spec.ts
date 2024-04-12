import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import AppTokens from 'src/app.tokens';
import FileService from 'src/file.service';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import PetTokens from './pet.tokens';
import { Pet, PetSchema } from './schemas/pet.schema';
import CreatePetUseCase from './usecases/create.pet.usecase';
import DeletePetUseCase from './usecases/delete.pet.usecase';
import GetPetByIdPetUseCase from './usecases/get.pet.by.id.usecase';
import GetPetsUseCase from './usecases/get.pets.usecase';
import UpdatePetUseCase from './usecases/update.pet.usecase';
import UpdatePetPhotoByIdUseCase from './usecases/update.photo.pet.by.id.usecase';

describe('PetController', () => {
  let controller: PetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          provide: PetTokens.getPetsUseCase,
          useClass: GetPetsUseCase,
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
    }).compile();

    controller = module.get<PetController>(PetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
