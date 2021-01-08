import { IsString, IsInt, IsNumber, IsObject  } from "class-validator";


export class CreateItemDto {
    @IsString()
    title       :   string;
    
    @IsObject()
    info        :   object;

    @IsNumber()
    price       :   number;

    @IsString()
    category    :   string;

    @IsInt()
    amount      :   number;
}