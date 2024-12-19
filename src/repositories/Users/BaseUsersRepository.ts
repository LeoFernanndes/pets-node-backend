import BaseRepository from "../base/BaseRepository";
import UserCreateDto from "../../dtos/users/UserCreateDto";
import UserDto from "../../dtos/users/UserDto";
import UserUpdateDto from "../../dtos/users/UserUpdateDto";
import UserLoginDto from "../../dtos/users/UserLoginDto";

export interface UsersRepositoryFilterFields {
    id?: string;
    role?: string;
}

export default abstract class BaseUsersRepository extends BaseRepository {
    abstract createUser(userCreateDto: UserCreateDto): Promise<UserDto>;
    abstract listUsers(filterFields:UsersRepositoryFilterFields): Promise<UserDto[]>;
    abstract retrieveUser(id: string): Promise<UserDto>;
    abstract updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<UserDto>;
    abstract getUserByUsernameToLogin(username: string): Promise<UserLoginDto>
}