import express, {Request, Response} from "express";
import UsersService from "../../../services/UsersService";
import UserCreateDto from "../../../dtos/users/UserCreateDto";
import {NotFoundOnService, ValidatonErrorOnService} from "../../../services/base/BaseErrors";
import UserUpdateDto from "../../../dtos/users/UserUpdateDto";
import {dependenciesContainer} from "./dependencies";


const usersRoutes = express.Router();

usersRoutes.post('/', async (req: Request, res: Response) => {
    const usersCreateDto = new UserCreateDto(req.body)
    const usersService = new UsersService(dependenciesContainer.usersRepository);
    try {
        const createdUserDto = await usersService.createUser(usersCreateDto)
        res.status(201).json(createdUserDto)
    } catch (error) {
        if (error instanceof ValidatonErrorOnService) {
            res.status(400).json(error.validationErrors)
        }
        res.status(500).json({'detail': 'Internal server error.'})
    }
});

usersRoutes.get('/', async (req: Request, res: Response) => {
    const usersService = new UsersService(dependenciesContainer.usersRepository);
    try {
        const listedUsersDto = await usersService.listUsers()
        res.status(200).json(listedUsersDto)
    } catch {
        res.status(500).json({'detail': 'Internal server error.'})
    }
});

usersRoutes.get('/:id', async (req: Request, res: Response) => {
    const usersService = new UsersService(dependenciesContainer.usersRepository);
    try {
        const retrieveUserDto = await usersService.retrieveUser(req.params['id'])
        res.status(200).json(retrieveUserDto)
    } catch (error) {
        if (error instanceof NotFoundOnService) {
            res.status(404).json({'detail': 'Not found.'})
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }
});

usersRoutes.put('/:id', async (req: Request, res: Response) => {
    const updateUserDto = new UserUpdateDto(req.body)
    const usersService = new UsersService(dependenciesContainer.usersRepository);
    try {
        const updatedUserDto = await usersService.updateUser(req.params['id'], updateUserDto)
        res.status(200).json(updatedUserDto)
    } catch (error) {
        if (error instanceof NotFoundOnService) {
            res.status(404).json({'detail': 'Not found.'})
        } else if (error instanceof ValidatonErrorOnService) {
            res.status(400).json(error.validationErrors)
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
            }
        }
    }
)

usersRoutes.delete('/:id', async (req: Request, res: Response) => {
    const usersService = new UsersService(dependenciesContainer.usersRepository);
    try {
        usersService.deleteUser(req.params['id'])
        res.status(204).json()
    } catch (error) {
        if (error instanceof NotFoundOnService) {
            res.status(404).json({'detail': 'Not found.'})
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }
})


export default usersRoutes;