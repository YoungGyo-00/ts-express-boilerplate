import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { UserResponseDto } from "../../dto/UserDto";
import { User } from "../entities/User";
import { IAuthRepository } from "./interface/IAuthRepository";

@Service()
export class AuthRepository implements IAuthRepository {
    async save(user: User): Promise<Mutation<UserResponseDto>> {
        try {
            const result: UserResponseDto = await User.save(user);
            return {
                status: OK,
                success: true,
                message: "회원가입 성공",
                result,
            };
        } catch (err: any) {
            return {
                status: FORBIDDEN,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}

export { User };
