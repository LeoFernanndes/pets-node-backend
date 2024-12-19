import express, {Request, Response} from "express";
import AuthService from "../../../services/AuthService";
import LoginDto from "../../../dtos/auth/LoginDto";
import {UnauthorizedOnService} from "../../../services/base/BaseErrors";
import {dependenciesContainer} from "./dependencies";


const authRoutes = express.Router();

authRoutes.post('/login', async (req: Request, res: Response) => {
    const loginDto = new LoginDto(req.body)
    const authService = new AuthService(dependenciesContainer.usersRepository);
    try {
        const tokensData = await authService.login(loginDto)
        res.setHeader('Authorization', tokensData['authToken']).cookie('refreshToken', tokensData['refreshToken'])
            .status(200).json(tokensData)
    } catch (error) {
        if (error instanceof UnauthorizedOnService) {
            res.status(401).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error.'})
        }
    }
});


export default authRoutes;