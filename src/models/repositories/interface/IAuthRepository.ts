import { User } from "../../entities/User";

export interface IAuthRepository {
    save(user: User): Promise<Mutation<User>>;
}
