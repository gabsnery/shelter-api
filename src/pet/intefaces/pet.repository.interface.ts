import { Pet } from '../schemas/pet.schema';
import FindByFilterAndTotal from '../usecases/dtos/find.by.filter.and.total.pet.usecase.output';
import GetPetsUseCaseInput from '../usecases/dtos/get.pets.usecase.input';
export default interface IPetRepository {
  create(val: Partial<Pet>): Promise<Pet>;
  getById(val: string): Promise<Pet>;
  update(data: Partial<Pet>): Promise<void>
  delete(data:string): Promise<void>
  get(data:GetPetsUseCaseInput): Promise<FindByFilterAndTotal>
}
