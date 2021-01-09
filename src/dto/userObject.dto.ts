import { IsDate, IsEmail, IsNumber, IsObject, IsString } from "class-validator";

export class UserObject{
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsNumber()
    balance: number; 

    @IsDate()
    createdAt: Date;

    @IsObject()
    purchasedGoods: object;

    @IsObject()
    myGoods: object;

    @IsString()
    role: string;
};