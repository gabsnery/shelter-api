export default class updateShelterDetailsUseCaseOutput{
  name:string
  whatsApp:string
  email:string
  phone:string
  createdAt:Date
  updatedAt:Date

  constructor(data:Partial<updateShelterDetailsUseCaseOutput>){
    Object.assign(this,data)
  }
}