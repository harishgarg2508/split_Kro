import { IsNumber } from "class-validator";

export class CreateGroupmemberDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    groupId: number;
    
}
