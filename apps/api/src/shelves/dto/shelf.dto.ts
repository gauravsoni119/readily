import { IsNotEmpty } from 'class-validator';

export class ShelfDto {
  @IsNotEmpty()
  title: string;
  description: string;
  bookId?: string;
}
