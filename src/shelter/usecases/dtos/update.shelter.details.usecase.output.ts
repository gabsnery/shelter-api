export default class updateShelterDetailsUseCaseOutput{
  name:string
  whatsApp:string
  email:string
  phone:string
  createAt:Date
  updateAt:Date

  constructor(data:Partial<updateShelterDetailsUseCaseOutput>){
    Object.assign(this,data)
  }
}