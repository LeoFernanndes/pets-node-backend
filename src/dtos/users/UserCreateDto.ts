import UserDto from "./UserDto";
import {IsEmpty, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {UserEntity} from "../../entities/user";


export default class UserCreateDto extends UserDto {
    @IsEmpty()
    id: string;
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(55)
    password: string;

    constructor(data: any) {
        super(data);
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.sex = data.sex;
        this.password = data.password
    }

    async generateEntity(): Promise<UserEntity> {
        const entity = await super.generateEntity()
        entity.password = this.password
        return entity
    }
}