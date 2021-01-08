import { IsNumber, IsObject, IsString } from "class-validator";

export class GenerateOrderDto{
    @IsString()
    itemId: string;

    @IsString()
    itemTitle: string;

    @IsNumber()
    amount: number;

    @IsObject()
    userData: object;
}