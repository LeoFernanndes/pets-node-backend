import PetDto, {PetGender, PetSize} from "./PetDto";
import {IsNotEmpty} from "class-validator";

export default class PetUpdateDto extends PetDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    age: number;
    @IsNotEmpty()
    sex: PetGender;
    @IsNotEmpty()
    size: PetSize;
    photos: string[];
    @IsNotEmpty()
    weight: number;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    behavior: string;
    observations: string;
}