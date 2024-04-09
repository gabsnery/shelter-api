import { Shelter } from '../schemas/shelter.schema';

export default interface IShelterRepository {
  get(): Promise<Shelter>;
  update(val: Partial<Shelter>): Promise<void>;
}
