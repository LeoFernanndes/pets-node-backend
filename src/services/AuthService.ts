import BaseUsersRepository from "../repositories/Users/BaseUsersRepository";
import LoginDto from "../dtos/auth/LoginDto";
import {Auth, AuthAndRefreshTokens, usernamePasswordLogin} from "./auth";
import {UnauthorizedOnService, ValidatonErrorOnService} from "./base/BaseErrors";


export default class AuthService {
    usersRepository: BaseUsersRepository
    constructor(usersRepository: BaseUsersRepository) {

        this.usersRepository = usersRepository;
    }

    async login(loginDto: LoginDto): Promise<AuthAndRefreshTokens> {
        const validationErrors = await loginDto.validateData();
        if(validationErrors.length > 0) {
            throw new ValidatonErrorOnService(validationErrors)
        }
        const userLoginDto = await this.usersRepository.getUserByUsernameToLogin(loginDto.username)
        if (!userLoginDto) {
            throw new UnauthorizedOnService()
        }
        if (!(await usernamePasswordLogin(loginDto.password, userLoginDto.password))){
            throw new UnauthorizedOnService()
        }
        const encodedTokens = await Auth.signAuthAndRefreshTokens(userLoginDto)
        encodedTokens['user'] = await  this.usersRepository.retrieveUser(userLoginDto.id)
        return encodedTokens
    }
}