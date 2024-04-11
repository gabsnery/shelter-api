export default class DeletePetUseCaseOutput {
  delete: string;

  constructor(data: Partial<DeletePetUseCaseOutput>) {
    Object.assign(this, data);
  }
}
