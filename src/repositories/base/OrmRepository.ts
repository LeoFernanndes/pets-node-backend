import BaseRepository from "./BaseRepository";


export default abstract class OrmRepository extends BaseRepository {
    dataSource: any
}