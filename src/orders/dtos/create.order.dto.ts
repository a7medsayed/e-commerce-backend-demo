import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  public totalPrice: number;

  public itemIds: number[];
}
