import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { MaxLength } from "class-validator";

enum Status {
  ATIVO = "ATIVO",
  CANCELADO = "CANCELADO",
}

export class CreateSystemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  acronym: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  user: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  justification: string;
}
