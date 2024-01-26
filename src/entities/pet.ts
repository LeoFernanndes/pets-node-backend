import BaseEntity from "./base/BaseEntity";


export class PetEntity extends BaseEntity {
    id: string;
    name: string;
    age: number;
    sex: string;
    size: string;
    photos: string[];
    weight: number;
    description: string;
    behavior: string;
    observations: string;
}