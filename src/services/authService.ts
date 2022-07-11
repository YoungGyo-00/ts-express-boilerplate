import { Service } from "typedi";
import AuthRepository, { User } from "../models/repository/authRepository";

@Service()
class UserService {
    constructor(private authRepository: AuthRepository) {}

    signup() {
        const user = new User();
        user.firstName = "test";
        user.lastName = "test";

        return this.authRepository.signup(user);
    }
}

export default UserService;
