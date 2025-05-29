import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsPositive,
  IsBoolean
} from 'class-validator';
import { IsNotBlank } from 'src/common/validators/is-not-blank-decorator';

export class CreateProjectDto {
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotBlank()
  @MaxLength(100)
  @ApiProperty({
    example: 'New Website Launch',
    description: 'The name of the project. Max length: 100 characters.',
  })
  name: string;

  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotBlank()
  @MaxLength(2000)
  @ApiProperty({
    example: 'This project involves launching a new e-commerce website with modern UI/UX.',
    description: 'Detailed description of the project. Max length: 2000 characters.',
  })
  description: string;

  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  // @IsNotBlank()
  @ApiProperty({
    example: 'https://example.com/project-image.png',
    description: 'URL to an image representing the project.',
  })
  readonly imageUrl: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    example: 15000,
    description: 'Total budget allocated for the project. Must be a positive number.',
  })
  readonly budget: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Indicates if the project is currently active.',
  })
  readonly isActive: boolean;
}
