import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
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

    // @CreateDateColumn({ type: "timestamp with time zone" })
    // createdAt: Date;

    // @UpdateDateColumn({ type: "timestamp with time zone" })
    // updatedAt: Date;
}
