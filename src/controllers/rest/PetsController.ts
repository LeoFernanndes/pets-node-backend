import BaseController from "./base/BaseController";
import BaseRequest from "./base/BaseRequest";
import PetCreateDto from "../../dtos/pets/PetCreateDto";
import BaseResponse from "./base/BaseResponse";
import PetsInMemoryRepository from "../../repositories/Pets/PetsInMemoryRepository";
import PetUpdateDto from "../../dtos/pets/PetUpdateDto";


export default class PetsController extends BaseController {
    repository: PetsInMemoryRepository
    constructor(request: BaseRequest) {
        super(request);
        this.repository = new PetsInMemoryRepository();
    }

    async createPet(): Promise<BaseResponse> {
        const petCreateDto = new PetCreateDto(this.request.body);
        const validationErrors = await petCreateDto.validateData();
        if(validationErrors.length > 0) {
            this.response.body = validationErrors;
            this.response.status = 400;
            return this.response;
        }
        const createdPet = await this.repository.createPet(petCreateDto)
        this.response.body = await createdPet;
        this.response.status = 201;
        return this.response;
    }

    async listPets(): Promise<BaseResponse> {
        this.response.body = await this.repository.listPets();
        this.response.status = 200;
        return this.response;
    }

    async retrievePet(): Promise<BaseResponse> {
        const retrievedPet = await this.repository.retrievePet(this.request.params["petId"]);
        if(!retrievedPet){
            this.response.status = 404;
            this.response.body = {"detail": "Not found."};
            return this.response;
        } else {
            this.response.status = 200;
            this.response.body = retrievedPet
            return this.response;
        }
    }

    async updatePet(): Promise<BaseResponse> {
        const petId = this.request.params["petId"]
        const retrievedPet = await this.repository.retrievePet(petId);
        if(!retrievedPet) {
            this.response.status = 404;
            this.response.body = {"detail": "Not found."}
            return this.response;
        }
        const petUpdateDto = new PetUpdateDto(this.request.body);
        const validationErrors = await petUpdateDto.validateData();
        if(validationErrors.length > 0) {
            this.response.body = validationErrors;
            this.response.status = 400;
            return this.response;
        }
        const updatedPet = await this.repository.updatePet(petId, petUpdateDto)
        this.response.body = await updatedPet;
        this.response.status = 200;
        return this.response;
    }

    async deletePet(): Promise<BaseResponse> {
        const petId = this.request.params["petId"];
        const pet = this.repository.deletePet(petId);
        if (!pet) {
            this.response.status = 400;
            this.response.body = {"detail": "Not found."};
            return this.response;
        } else {
            this.response.status = 204;
            this.response.body = {"detail": "No content."}
            return this.response;
        }
    }

}