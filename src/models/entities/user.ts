import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { BaseTimeEntity } from "./BaseTimeEntity";

@Entity("users")
export class User extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    email: string;

    @Column({
        nullable: true,
    })
    password: string;
}
