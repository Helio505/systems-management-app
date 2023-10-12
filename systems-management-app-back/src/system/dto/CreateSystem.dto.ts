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

  // User responsible for last update can only be created when updating.
  // ALERT: Change before production.
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  user: string;

  // Justification for last update can only be created when updating.
  // ALERT: Change before production.
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  justification: string;
}
