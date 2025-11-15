import { Exclude } from "class-transformer";
import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Class to generate the User table in the database
 */
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true
    })
    @Exclude() //this prevents the password from getting sent back with the resposne
    password?: string;

     @Column({
        type: 'varchar',
        nullable: true
    })
    @Exclude() 
    googleId?: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

}