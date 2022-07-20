import { Service } from "typedi";
import { UserRequestDto } from "../dto/UserRequestDTO";
import { AuthRepository, User } from "../models/repositories/authRepository";

@Service()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    signup(userDto: UserRequestDto) {
        const { email, password } = userDto;
        const user = new User();
        user.email = email;
        user.password = password;

        return this.authRepository.save(user);
    }
}
