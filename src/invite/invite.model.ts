import { Column, DataType, Table, Model, ForeignKey } from "sequelize-typescript";
import { Event } from "src/events/event.model";
import { User } from "src/users/users.model";
 

interface InviteCreationAtr{
    userId: number;
    eventId: number;
    isAccepted: boolean;
}

@Table({tableName: "invite"})
export class Invite extends Model<Invite, InviteCreationAtr >{

    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ForeignKey(() => Event)
    @Column({type: DataType.INTEGER, allowNull: false})
    eventId: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    isAccepted: boolean;

}