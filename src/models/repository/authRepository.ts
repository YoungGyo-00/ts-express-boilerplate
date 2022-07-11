import { Service } from "typedi";
import User from "../entities/user";

@Service()
class AuthRepository {
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
export default AuthRepository;
