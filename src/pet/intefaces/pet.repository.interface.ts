import { Pet } from '../schemas/pet.schema';

export default interface IPetRepository {
  create(val: Partial<Pet>): Promise<Pet>;
}
