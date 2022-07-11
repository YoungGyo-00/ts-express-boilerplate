import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: true,
    })
    firstName: string;

    @Column()
    lastName!: string;

    // @CreateDateColumn({ type: "timestamp with time zone" })
    // createdAt: Date;

    // @UpdateDateColumn({ type: "timestamp with time zone" })
    // updatedAt: Date;
}

export default User;
