import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { MaxLength } from "class-validator";

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
