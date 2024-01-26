import PetCreateDto from "../../dtos/pets/PetCreateDto";
import PetDto from "../../dtos/pets/PetDto";
import PetUpdateDto from "../../dtos/pets/PetUpdateDto";


export default interface PetsRepositoryInterface {
    createPet(petCreateDto: PetCreateDto): Promise<PetDto>;
    listPets(): Promise<PetDto[]>;
    retrievePet(petId: string): Promise<PetDto>;
    updatePet(petId: string, petUpdateDto: PetUpdateDto): Promise<PetDto>;
    deletePet(petId): Promise<PetDto>;
}