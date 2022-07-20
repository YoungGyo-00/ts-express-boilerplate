import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimeEntity } from "./base/BaseTimeEntity";

@Entity("users")
export class User extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    email: string;

    @Column({
        nullable: true,
    })
    password!: string;
}
