import BaseDto from "../base/BaseDto";
import {IsEnum, IsInt, MaxLength, MinLength, validate, validateSync, ValidationError} from "class-validator";
import {PetEntity} from "../../entities/pet";


export enum PetGender {
    male = "male",
    female = "female"
}

export enum PetSize {
    small = "small",
    medium = "medium",
    large = "large"
}


export default class PetDto extends BaseDto {
    id: string;
    @MinLength(2)
    @MaxLength(20)
    name: string;
    @IsInt()
    age: number;
    @IsEnum(PetGender)
    sex: PetGender;
    @IsEnum(PetSize)
    size: PetSize;
    photos: string[];
    weight: number;
    description: string;
    behavior: string;
    observations: string;
    tutorId: string

    constructor(data: any) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.sex = data.sex;
        this.size = data.size;
        this.photos = data.photos || [];
        this.weight = data.weight;
        this.description = data.description;
        this.behavior = data.behavior;
        this.observations = data.observations || "";
        this.tutorId = data.tutorId;
    }

    async generateEntity(): Promise<PetEntity> {
        if ((await this.validateData()).length == 0){
            const petEntity = new PetEntity();
            petEntity.id = this.id;
            petEntity.name = this.name;
            petEntity.age = this.age;
            petEntity.sex = this.sex;
            petEntity.size = this.size;
            petEntity.photos = this.photos;
            petEntity.weight = this.weight;
            petEntity.description = this.description;
            petEntity.behavior = this.behavior;
            petEntity.observations = this.observations;
            petEntity.tutorId = this.tutorId;
            return petEntity;
        }
        return undefined;
    }

    async validateData(): Promise<ValidationError[]> {
        const validatonErrors = validateSync(this);
        return validatonErrors;
    }
}