import BaseRepository from "../base/BaseRepository";
import PetCreateDto from "../../dtos/pets/PetCreateDto";
import PetDto from "../../dtos/pets/PetDto";
import PetUpdateDto from "../../dtos/pets/PetUpdateDto";


export default abstract class BasePetsRepository extends BaseRepository {
    abstract createPet(petCreateDto: PetCreateDto): Promise<PetDto>;
    abstract deletePet(petId): Promise<PetDto>;
    abstract listPets(): Promise<PetDto[]>;
    abstract retrievePet(petId: string): Promise<PetDto>;
    abstract updatePet(petId: string, petUpdateDto: PetUpdateDto): Promise<PetDto>;
}