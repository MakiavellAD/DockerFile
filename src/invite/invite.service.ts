import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invite } from './invite.model';

@Injectable()
export class InviteService {


    constructor (@InjectModel(Invite) private InviteRepository: typeof Invite){

    }

//     async makeInvite(idOfUser: number, body: any): Promise<Invite>{
//         const event = await this.InviteRepository.findOne({where:{}})
//         return
// }
}
