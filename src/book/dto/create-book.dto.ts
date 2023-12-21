import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Fiction' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({ example: 208 })
  @IsNumber()
  @IsNotEmpty()
  pageCount: number;

  @ApiProperty({ example: '1925-04-10' })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
