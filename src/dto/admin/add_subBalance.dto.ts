import { IsNumber, IsString } from "class-validator";

export class Add_SubBalance{
    @IsString()
    userId: string;
    @IsNumber()
    howMany: number;
}