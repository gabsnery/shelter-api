import { IUseCase } from "src/domain/iusecase.interface";
import getShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";
export default class GetShelterDetailsUseCase implements IUseCase<null, getShelterDetailsUseCaseOutput>{
  run(input: null): Promise<getShelterDetailsUseCaseOutput> {
    return Promise.resolve(new getShelterDetailsUseCaseOutput({
      shelterName:'casadosdog',
        shelterWhatsapp:'15998550238',
        shelterEmail:'casadosdog@gmail.com',
        shelterPhone:'15998550238',
        createAt:new Date(),
        updateAt:new Date()
    }))
  }
}