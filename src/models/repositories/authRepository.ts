import { Service } from "typedi";
import { User } from "../entities/User";
import { IAuthRepository } from "./interface/IAuthRepository";

@Service()
export class AuthRepository implements IAuthRepository {
    async signup(user: User): Promise<Mutation<User>> {
        try {
            const result = await User.save(user);
            return {
                success: true,
                result,
            };
        } catch (err) {
            return {
                success: false,
                error: err,
            };
        }
    }
}

export { User };
