import { Pet } from '../schemas/pet.schema';

export default interface IPetRepository {
  create(val: Partial<Pet>): Promise<Pet>;
  getById(val: string): Promise<Pet>;
  update(data: Partial<Pet>): Promise<void>
  delete(data:string): Promise<void>
}
