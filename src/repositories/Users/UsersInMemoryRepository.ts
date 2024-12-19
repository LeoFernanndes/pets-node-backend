import UserCreateDto from "../../dtos/users/UserCreateDto";
import {usersSeed} from "./usersSeed";
import UserDto from "../../dtos/users/UserDto";
import BaseUsersRepository from "./BaseUsersRepository";
import UserUpdateDto from "../../dtos/users/UserUpdateDto";
import bcrypt from "bcrypt"
import UserLoginDto from "../../dtos/users/UserLoginDto";


const initialUsers: any = usersSeed

export default class UsersInMemoryRepository extends BaseUsersRepository {
    async createUser(userCreateDto: UserCreateDto): Promise<UserDto> {
        const userEntity = await userCreateDto.generateEntity();
        userEntity.password = bcrypt.hashSync(userEntity.password, 15)
        userEntity.id = `user_${initialUsers.length + 1}`;
        initialUsers.push(userEntity);
        console.log(userEntity)
        return new UserDto(userEntity)
    }

    async listUsers(): Promise<UserDto[]> {
        const usersList: UserDto[] = [];
        initialUsers.forEach(user => {
            const userDto = new UserDto(user)
            usersList.push(userDto)
        })
        return usersList;
    }

    async retrieveUser(id): Promise<UserDto> {
        const user = initialUsers.find(user => user.id == id);
        if (user){
            return new UserDto(user);
        }
        return;
    }

    async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<UserDto> {
        const i = initialUsers.findIndex(user => user.id == id);
        if (i < initialUsers.length){
            const updatedUser = await userUpdateDto.generateEntity();
            updatedUser.id = id;
            initialUsers[i] = updatedUser;
            return new UserDto(updatedUser);
        }
        return;
    }

    async deleteUser(id): Promise<UserDto> {
        const i = initialUsers.findIndex(user => user.id == id);
        if (i < initialUsers.length){
            const userEntity = initialUsers[i]
            delete initialUsers[i];
            return new UserDto(userEntity);
        }
        return;
    }

    async getUserByUsernameToLogin(username: string): Promise<UserLoginDto> {
        const user = initialUsers.find(user => user.name == username);
        if (user){
            return new UserLoginDto(user);
        }
        return;
    }
}