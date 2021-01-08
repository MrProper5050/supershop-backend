import { IsString } from "class-validator";

export class ChangeOrderStateDto{
    @IsString()
    orderId:string;

    @IsString()
    state: string;
}