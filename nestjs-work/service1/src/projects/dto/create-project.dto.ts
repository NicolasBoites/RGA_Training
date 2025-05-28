import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, ValidateIf } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  // @ValidateIf((o, value) => value.trim() !== null && value !== undefined && value.trim() !== '' )
  name: string;

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  description: string;

  @IsString()
  readonly imageUrl: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
