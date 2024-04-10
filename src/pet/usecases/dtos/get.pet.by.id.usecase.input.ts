export default class GetPetByIdPetUseCaseInput{
    id:string

    constructor(data:Partial<GetPetByIdPetUseCaseInput>){
      Object.assign(this,data)
    }
  }