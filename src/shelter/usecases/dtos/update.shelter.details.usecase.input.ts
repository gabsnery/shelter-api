export default class updateShelterDetailsUseCaseInput{
  name:string
  whatsApp:string
  email:string
  phone:string

  constructor(data:Partial<updateShelterDetailsUseCaseInput>){
    Object.assign(this,data)
  }
}