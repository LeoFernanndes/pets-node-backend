import UserDto from "./UserDto";
import {IsEmpty} from "class-validator";


export default class UserUpdateDto extends UserDto {
    @IsEmpty()
    id: string;
}