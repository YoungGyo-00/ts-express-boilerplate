import { Service } from "typedi";
import { User } from "../entities/User";
import { IAuthRepository } from "./interface/IAuthRepository";

@Service()
export class AuthRepository implements IAuthRepository {
    async save(user: User): Promise<Mutation<User>> {
        try {
            const result = await User.save(user);
            return {
                success: true,
                message: "회원가입 성공",
                result,
            };
        } catch (err) {
            return {
                success: false,
                message: "회원가입 오류",
                error: err,
            };
        }
    }
}

export { User };
