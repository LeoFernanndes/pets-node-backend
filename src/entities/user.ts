import BaseEntity from "./base/BaseEntity";


export class UserEntity extends BaseEntity {
    id: string;
    name: string;
    age: number;
    sex: string;
    password: string;
    role: string;
}