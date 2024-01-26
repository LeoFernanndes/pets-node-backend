import express, {Request, Response} from "express";
import BaseRequest from "../controllers/rest/base/BaseRequest";
import PetsController from "../controllers/rest/PetsController";


const petsRoutes = express.Router();

petsRoutes.post('/', async (req: Request, res: Response) => {
    const request = new BaseRequest(req.body, req.headers, req.params, req.query);
    const petsController = new PetsController(request);
    const response = await petsController.createPet();
    res.status(response.status).json(response.body);
});

petsRoutes.get('/', async (req: Request, res: Response) => {
    const request = new BaseRequest(req.body, req.headers, req.params, req.query);
    const petsController = new PetsController(request);
    const response = await petsController.listPets();
    res.status(response.status).json(response.body);
});

petsRoutes.get('/:petId', async (req: Request, res: Response) => {
    const request = new BaseRequest(req.body, req.headers, req.params, req.query);
    const petsController = new PetsController(request);
    const response = await petsController.retrievePet();
    res.status(response.status).json(response.body);
});

petsRoutes.put('/:petId', async (req: Request, res: Response) => {
    const request = new BaseRequest(req.body, req.headers, req.params, req.query);
    const petsController = new PetsController(request);
    const response = await petsController.updatePet();
    res.status(response.status).json(response.body);
});

petsRoutes.delete('/:petId', async (req: Request, res: Response) => {
    const request = new BaseRequest(req.body, req.headers, req.params, req.query);
    const petsController = new PetsController(request);
    const response = await petsController.deletePet();
    res.status(response.status).json(response.body);
});

export default petsRoutes;