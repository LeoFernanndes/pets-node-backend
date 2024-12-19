import UsersInMemoryRepository from "../../../repositories/Users/UsersInMemoryRepository";
import BaseUsersRepository from "../../../repositories/Users/BaseUsersRepository";
import BasePetsRepository from "../../../repositories/Pets/BasePetsRepository";
import PetsInMemoryRepository from "../../../repositories/Pets/PetsInMemoryRepository";


interface dependencyContainer {
    usersRepository: BaseUsersRepository,
    petsRepository: BasePetsRepository
}


export const dependenciesContainer: dependencyContainer = {
    'usersRepository': new UsersInMemoryRepository(),
    'petsRepository': new PetsInMemoryRepository()
}
