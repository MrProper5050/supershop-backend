import { IsString, MinLength } from "class-validator";

export default class LoginUserDto{
    @IsString()
    userName_or_Email:  string;

    @IsString()
    @MinLength(6)
    password:           string;
}