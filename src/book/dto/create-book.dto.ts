import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pageCount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
