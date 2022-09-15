import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import {Event} from './events/event.model'
import { EventsModule } from "./events/events.module";
import { Invite } from "./invite/invite.model";
import { InviteModule } from './invite/invite.module';
import { AuthModule } from './auth/auth.module';



@Module({
    controllers: [],
    providers: [],
    imports:[
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Event, Invite],
            autoLoadModels: true
            
          }),

        UsersModule, EventsModule, InviteModule, AuthModule
        
    ],
    

})
export class AppModule{

}
