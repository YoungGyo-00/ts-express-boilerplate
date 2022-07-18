import { User } from "../../entities/User";

export interface IAuthRepository {
    signup(user: User): Promise<Mutation<User>>;
}
