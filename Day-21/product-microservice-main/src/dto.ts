import { IsString } from "class-validator";


export class CreateProductDto {
    @IsString()
    id: string;

    @IsString()
    name: string;
}