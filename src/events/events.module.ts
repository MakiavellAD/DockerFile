import { Module} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { User } from 'src/users/users.model';
import { Invite } from 'src/invite/invite.model';
import {JwtService} from "@nestjs/jwt";
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports:[
    SequelizeModule.forFeature([Event, User, Invite]),
    JwtModule.register({secret: `${process.env.PRIVATE_KEY}`})
  ],
  exports: [
    EventsService
  ]
})
export class EventsModule {}
