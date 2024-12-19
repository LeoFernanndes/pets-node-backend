import express, {Request, Response} from "express";
import PetsService from "../../../services/PetsService";
import auth from "./middlewares/auth";
import PetCreateDto from "../../../dtos/pets/PetCreateDto";
import {dependenciesContainer} from "./dependencies";
import {NotFoundOnService, ValidatonErrorOnService} from "../../../services/base/BaseErrors";
import PetUpdateDto from "../../../dtos/pets/PetUpdateDto";


const petsRoutes = express.Router();

petsRoutes.use(auth)


petsRoutes.post('/', async (req: Request, res: Response) => {
    const petCreateDto = new PetCreateDto(req.body)
    const petsService = new PetsService(dependenciesContainer.petsRepository);
    try {
        const petDto = await petsService.createPet(petCreateDto);
        res.status(201).json(petDto);
    } catch (error){
        if (error instanceof ValidatonErrorOnService){
            res.status(400).json(error.validationErrors)
        }
        else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }
});

petsRoutes.get('/', async (req: Request, res: Response) => {
    const petsService = new PetsService(dependenciesContainer.petsRepository);
    const petsDto = await petsService.listPets();
    res.status(200).json(petsDto);
});

petsRoutes.get('/:petId', async (req: Request, res: Response) => {
    const petsService = new PetsService(dependenciesContainer.petsRepository);
    try {
        const petDto = await petsService.retrievePet(req.params['petId']);
        res.status(200).json(petDto);
    } catch (error) {
        if (error instanceof NotFoundOnService){
            res.status(404).json({'detail': 'Not found.'})
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }
});

petsRoutes.put('/:petId', async (req: Request, res: Response) => {
    const petUpdateDto = new PetUpdateDto(req.body)
    const petsService = new PetsService(dependenciesContainer.petsRepository);
    try {
        const updatedPetDto = await petsService.updatePet(req.params['petId'], petUpdateDto);
        res.status(200).json(updatedPetDto);
    } catch (error) {
        if (error instanceof NotFoundOnService) {
            res.status(404).json({'detail': 'Not found.'})
        } else if (error instanceof ValidatonErrorOnService) {
            res.status(400).json(error.validationErrors)
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }

});

petsRoutes.delete('/:petId', async (req: Request, res: Response) => {
    const petsController = new PetsService(dependenciesContainer.petsRepository);
    try {
        await petsController.deletePet(req.params['petId']);
        res.status(204).json();
    } catch (error) {
        console.log(error instanceof NotFoundOnService)
        if (error instanceof NotFoundOnService) {
            res.status(404).json({'detail': 'Not found'})
        } else {
            res.status(500).json({'detail': 'Internal server error.'});
        }
    }
});

export default petsRoutes;