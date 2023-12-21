import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAuthorDto {
  @ApiProperty({ example: 'F. Scott' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @ApiProperty({ example: 'Fitzgerald' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
