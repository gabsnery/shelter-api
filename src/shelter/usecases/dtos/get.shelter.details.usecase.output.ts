export default class getShelterDetailsUseCaseOutput{
  shelterName:string
  shelterWhatsApp:string
  shelterEmail:string
  shelterPhone:string
  createAt:Date
  updateAt:Date

  constructor(data:Partial<getShelterDetailsUseCaseOutput>){
    Object.assign(this,data)
  }
}