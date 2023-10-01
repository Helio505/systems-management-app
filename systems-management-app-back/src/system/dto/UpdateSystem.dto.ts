import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { MaxLength } from "class-validator";

enum Status {
  ATIVO = "ATIVO",
  CANCELADO = "CANCELADO",
}

export class UpdateSystemDto {
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
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  user: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  justification: string;
}
