import PetCreateDto from "../../dtos/pets/PetCreateDto";
import PetDto from "../../dtos/pets/PetDto";
import BaseRepository from "../base/BaseRepository";
import PetsRepositoryInterface from "./PetsRepositoryInterface";
import PetUpdateDto from "../../dtos/pets/PetUpdateDto";
import {petsSeed} from "./petsSeed";


const initialPets: any = petsSeed;

export default class PetsInMemoryRepository extends BaseRepository implements PetsRepositoryInterface{
    async createPet(petCreateDto: PetCreateDto): Promise<PetDto> {
        const petEntity = await petCreateDto.generateEntity();
        petEntity.id = `pet_${initialPets.length + 1}`;
        initialPets.push(petEntity);
        return new PetDto(petEntity);
    }

    async listPets(): Promise<PetDto[]> {
        const petList: PetDto[] = [];
        initialPets.forEach(pet => {
            const petDto = new PetDto(pet);
            petList.push(petDto);
        })
        return petList;
    }

    async retrievePet(petId: string): Promise<PetDto> {
        const pet = initialPets.find(pet => pet.id == petId);
        if (pet){
            return new PetDto(pet);
        }
        return;
    }

    async updatePet(petId: string, petUpdateDto: PetUpdateDto): Promise<PetDto> {
        const i = initialPets.findIndex(pet => pet.id == petId);
        if (i < initialPets.length){
            const updatedPet = await petUpdateDto.generateEntity();
            updatedPet.id = petId;
            initialPets[i] = updatedPet
            return new PetDto(updatedPet);
        }
        return;
    }

    async deletePet(petId): Promise<PetDto> {
        const i = initialPets.findIndex(pet => pet.id == petId);
        if (i < initialPets.length){
            const petEntity = initialPets[i]
            delete initialPets[i];
            return new PetDto(petEntity);
        }
        return;
    }
}