import UserCreateDto from "../dtos/users/UserCreateDto";
import BaseUsersRepository from "../repositories/Users/BaseUsersRepository";
import UserUpdateDto from "../dtos/users/UserUpdateDto";
import UserDto from "../dtos/users/UserDto";
import {NotFoundOnService, ValidatonErrorOnService} from "./base/BaseErrors";


export default class UsersService {
    usersRepository: BaseUsersRepository
    constructor(usersRepository: BaseUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(userCreateDto: UserCreateDto): Promise<UserDto> {
        const validationErrors = await userCreateDto.validateData();
        if(validationErrors.length > 0) {
            throw new ValidatonErrorOnService(validationErrors)
        }
        return await this.usersRepository.createUser(userCreateDto);
    }

    async listUsers(): Promise<UserDto[]> {
        return await this.usersRepository.listUsers({});
    }

    async retrieveUser(userId: string): Promise<UserDto> {
        const user = await this.usersRepository.retrieveUser(userId);
        if (!user) {
            throw new NotFoundOnService('User', userId)
        }
        return user
    }

    async updateUser(userId: string, userUpdateDto: UserUpdateDto): Promise<UserDto> {
        const user = await this.usersRepository.retrieveUser(userId);
        if (!user) {
            throw new NotFoundOnService('User', userId)
        }
        const validationErrors = await userUpdateDto.validateData();
        if(validationErrors.length > 0) {
            throw new ValidatonErrorOnService(validationErrors)
        }
        return await this.usersRepository.updateUser(userId, userUpdateDto);
    }

    async deleteUser(userId: string): Promise<void> {
        const user = await this.usersRepository.retrieveUser(userId);
        if (!user) {
            throw new NotFoundOnService('User', userId)
        }
        return
    }
}