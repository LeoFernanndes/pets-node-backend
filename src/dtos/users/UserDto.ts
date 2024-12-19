import BaseDto from "../base/BaseDto";
import {UserEntity} from "../../entities/user";
import {IsEnum, IsInt, MaxLength, MinLength, validate, ValidationError} from "class-validator";


export enum UserGender {
    male = "male",
    female = "female"
}

export enum UserRole {
    commonUser = "commonUser",
    petTutor = "petTutor",
    admin = "admin"
}

export default class UserDto extends BaseDto {
    id: string;
    @MinLength(3)
    @MaxLength(15)
    name: string;
    @IsInt()
    age: number;
    @IsEnum(UserGender)
    sex: UserGender
    @IsEnum(UserRole)
    role: UserRole;

    constructor(data: any) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.sex = data.sex;
        this.role = data.role;
    }

    async generateEntity(): Promise<UserEntity> {
        if ((await this.validateData()).length == 0){
            const userEntity = new UserEntity();
            userEntity.id = this.id;
            userEntity.name = this.name;
            userEntity.age = this.age;
            userEntity.sex = this.sex;
            userEntity.role = this.role;
            return userEntity;
        }
        return undefined;
    }

    async validateData(): Promise<ValidationError[]> {
        return await validate(this);
    }
}