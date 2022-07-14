import { Service } from "typedi";
import { AuthRepository, User } from "../models/repository/authRepository";

@Service()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    signup() {
        const user = new User();
        user.email = "test";
        user.password = "test";

        return this.authRepository.signup(user);
    }
}
