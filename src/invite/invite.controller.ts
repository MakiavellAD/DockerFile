import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import { TokenData } from 'src/auth/event.decorator';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { Invite } from './invite.model';

@Controller('invite')
export class InviteController {

    constructor(private InviteService: InviteService){
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('/deleteEvent')
    // deleteEvent(@Body() body: any, @TokenData() tokenData: CreateEventDto): Promise<Invite>{
    //     return this.InviteService.makeInvite(tokenData.id, body)
        
    // }



}
