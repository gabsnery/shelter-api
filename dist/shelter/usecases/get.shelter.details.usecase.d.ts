import { IUseCase } from "src/domain/iusecase.interface";
import getShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";
export default class GetShelterDetailsUseCase implements IUseCase<null, getShelterDetailsUseCaseOutput> {
    run(input: null): Promise<getShelterDetailsUseCaseOutput>;
}
