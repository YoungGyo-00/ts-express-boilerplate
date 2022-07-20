import { Service } from "typedi";
import { BadRequest, Conflict } from "../common/errors/error";
import { UserRequestDto, UserResponseDto } from "../dto/UserDto";
import { AuthRepository, User } from "../models/repositories/authRepository";
import bcrypt from "bcrypt";

@Service()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async signup(userDto: UserRequestDto): Promise<Mutation<UserResponseDto>> {
        const { email, password } = userDto;

        const exEmail = await User.findOne({ email });
        const exPassword = await User.findOne({ password });

        if (!email) {
            throw new BadRequest("아이디는 필수로 적어야 합니다");
        }
        if (!password) {
            throw new BadRequest("비밀번호는 필수로 적어야 합니다");
        }
        if (exEmail) {
            throw new Conflict("중복된 아이디가 이미 존재합니다");
        }
        if (exPassword) {
            throw new Conflict("중복된 비밀번호가 이미 존재합니다");
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.password = hash;

        return this.authRepository.save(user);
    }
}
