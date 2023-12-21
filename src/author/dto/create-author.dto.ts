import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
