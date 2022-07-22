import { FORBIDDEN, OK } from "http-status-codes";
import { Service } from "typedi";
import { UserResponseDto } from "@dtos/UserDto";
import { User } from "@entities/User";
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

    async findOneByEmail(email: string): Promise<User | undefined> {
        console.log("start");
        const result = await User.findOne({ email: email });
        console.log("finish");
        return result;
    }
}

export { User };
