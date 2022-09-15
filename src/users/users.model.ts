import { INTEGER } from "sequelize";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Invite } from "src/invite/invite.model";
import {Event} from 'src/events/event.model'


interface UserCreationAtr{
    email: string;
    username: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model <User, UserCreationAtr>{

    @ApiProperty({example:1, description: "uniq ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:"alex.machulis@gmail.com", description: "user email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example:'Makiavelli', description: "username"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @ApiProperty({example:'123456', description: "user password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Event, () => Invite)
    events: Event[]

}