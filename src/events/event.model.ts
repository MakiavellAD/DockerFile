import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Invite } from "src/invite/invite.model";
import { User } from "src/users/users.model";



interface EventCreationAtr{
    title: string;
    date: Date;
    userId: number;
}

interface FindIdAtr{
    userId: number;
}

@Table({tableName: "events"})
export class Event extends Model<Event, EventCreationAtr >{
    
    @ApiProperty({example:1, description: "uniq ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:"Viva Braslav", description: "titile of event"})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    title: string;

    @ApiProperty({example: 20220808, description: "Date of Event"})
    @Column({type: DataType.DATE, allowNull:false})
    date: Date;

    @ApiProperty({example:1, description: "uniq ID of event owner"})
    @Column({type: DataType.INTEGER, allowNull:false})
    userId: number;

    @BelongsToMany(() => User, () => Invite)
    users: User[]

}