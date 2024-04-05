import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"


export default class UpdateShelterControlerInput{
  @IsString()
  @IsNotEmpty()
  name:string
  //@Matches(new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
  @IsNotEmpty()
  @IsString()
  @Length(10,11)
  whatsApp:string
  @Length(10,11)
  @IsNotEmpty()
  phone:string
  @IsEmail()
  @IsNotEmpty()
  email:string
}