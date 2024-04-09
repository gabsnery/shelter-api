export default class getShelterDetailsUseCaseOutput{
  shelterName:string
  shelterWhatsApp:string
  shelterEmail:string
  shelterPhone:string
  createdAt:Date
  updatedAt:Date

  constructor(data:Partial<getShelterDetailsUseCaseOutput>){
    Object.assign(this,data)
  }
}