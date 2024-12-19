import PetCreateDto from "../dtos/pets/PetCreateDto";
import BasePetsRepository from "../repositories/Pets/BasePetsRepository";
import PetUpdateDto from "../dtos/pets/PetUpdateDto";
import {NotFoundOnService, ValidatonErrorOnService} from "./base/BaseErrors";
import PetDto from "../dtos/pets/PetDto";


export default class PetsService {
    repository: BasePetsRepository
    constructor(repository: BasePetsRepository) {
        this.repository = repository;
    }

    async createPet(petCreateDto: PetCreateDto): Promise<PetDto> {
        const validationErrors = await petCreateDto.validateData();
        if(validationErrors.length > 0) {
            throw new ValidatonErrorOnService(validationErrors)
        }
        return await this.repository.createPet(petCreateDto)
    }

    async listPets(): Promise<PetDto[]> {
        return await this.repository.listPets();
    }

    async retrievePet(petId): Promise<PetDto> {
        const petDto = await this.repository.retrievePet(petId);
        if (!petDto){
            throw new NotFoundOnService('Pet', petId)
        }
        return petDto
    }

    async updatePet(petId, petUpdateDto: PetUpdateDto): Promise<PetDto> {
        const retrievedPet = await this.repository.retrievePet(petId);
        if(!retrievedPet) {
            throw new NotFoundOnService('Pet', petId)
        }
        const validationErrors = await petUpdateDto.validateData();
        if(validationErrors.length > 0) {
            throw new ValidatonErrorOnService(validationErrors)
        }
        return await this.repository.updatePet(petId, petUpdateDto)
    }

    async deletePet(petId): Promise<void> {
        const pet = await this.repository.retrievePet(petId);
        if (!pet) {
            throw new NotFoundOnService('Pet', petId)
        }
        await this.repository.deletePet(petId);
    }
}