import { Service } from "typedi";
import { BadRequest, Conflict } from "../common/errors/error";
import { UserRequestDto, UserResponseDto } from "../dto/UserDto";
import { AuthRepository, User } from "../models/repositories/authRepository";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { OK } from "http-status-codes";

@Service()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async signin(req: Request): Promise<Mutation<User>> {
        return await passport.authenticate("local", async (err, user) => {
            if (err) {
                return {
                    status: err.status,
                    success: false,
                    message: err.message,
                    error: err,
                };
            }
            return req.login(user, loginError => {
                if (loginError) {
                    return {
                        status: err.status,
                        success: false,
                        message: err.message,
                        error: err,
                    };
                }
                console.log(5);
                return {
                    status: OK,
                    success: true,
                    message: `${user.email}님 로그인 성공`,
                    result: user,
                };
            });
        })(req);
    }

    async signup(userDto: UserRequestDto): Promise<Mutation<UserResponseDto>> {
        const { email, password } = userDto;

        try {
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
        } catch (err: any) {
            return {
                status: err.status,
                success: false,
                message: err.message,
                error: err,
            };
        }
    }
}
