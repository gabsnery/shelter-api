export default class GetPetsUseCaseInput {
  type?: string;
  size?: string;
  genter?: string;
  page: number;
  itemsPetPage: number;

  constructor(data: Partial<GetPetsUseCaseInput>) {
    Object.assign(this, data);
  }
}
