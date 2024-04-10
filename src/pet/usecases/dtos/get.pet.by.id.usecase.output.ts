export default class GetPetByIdPetUseCaseOutput {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  bio: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<GetPetByIdPetUseCaseOutput>) {
    Object.assign(this, data);
  }
}
