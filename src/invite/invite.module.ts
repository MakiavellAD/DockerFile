import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InviteController } from './invite.controller';
import { Invite } from './invite.model';
import { InviteService } from './invite.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { Event } from 'src/events/event.model';

@Module({
  controllers: [InviteController],
  providers: [InviteService],
  imports: [
    SequelizeModule.forFeature([Invite, User, Event]),
    JwtModule.register({secret: `${process.env.PRIVATE_KEY}`})
  ],
  exports: [InviteService]
})
export class InviteModule {}
