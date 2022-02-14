import { IsString , IsEmail, IsBoolean } from 'class-validator'
export class CreateUserDto
{
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;

    @IsBoolean()
    public admin?: boolean;
}