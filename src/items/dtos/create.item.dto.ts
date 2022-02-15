import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateItemDto {
  @IsString()
  public name: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public count: number;

  @IsBoolean()
  public isActive: boolean;
}
