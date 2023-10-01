import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { MaxLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class QuerySystemsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @IsOptional()
  acronym: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  email: string;
}
