import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Event } from 'src/events/event.model';
import { Invite } from 'src/invite/invite.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Event, Invite]),
    JwtModule.register({secret: `${process.env.PRIVATE_KEY}`})

  ],
  exports: [UsersService]
})
export class UsersModule {}
