import getShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import UpdateShelterControlerInput from './dtos/update.shelter.controller.input';
export declare class ShelterController {
    private readonly GetShelterDetailsUseCase;
    getShelterDetails(): Promise<getShelterDetailsUseCaseOutput>;
    updateShelterDetails(input: UpdateShelterControlerInput): Promise<void>;
}
