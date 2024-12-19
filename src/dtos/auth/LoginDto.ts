import BaseDto from "../base/BaseDto";
import {validate, ValidationError} from "class-validator";

export default class LoginDto extends BaseDto {
    username: string;
    password: string;

    constructor(data: any) {
        super();
        this.username = data.username;
        this.password = data.password;
    }

    async validateData(): Promise<ValidationError[]> {
        return await validate(this);
    }
}