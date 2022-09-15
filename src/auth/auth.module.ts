import {Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt'
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
     UsersModule,
     JwtModule.register({
      secret: `${process.env.PRIVATE_KEY}`,
    })
  ],
  exports: [
    AuthService, 
  ]
})
export class AuthModule {}
