import { IsNumber, IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    groupName:string

    @IsNumber()
    categoryId:number

}
