import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize/types';
import { User } from 'src/users/users.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';
import {JwtService} from "@nestjs/jwt";
import { request } from 'http';
import { IdEventDto } from './dto/id-event.dto';
import {UnauthorizedException} from '@nestjs/common';
import { Invite } from 'src/invite/invite.model';


@Injectable()
export class EventsService {


    constructor (@InjectModel(Event) private eventRepositiry: typeof Event,
                 @InjectModel(User) private userRepository: typeof User,
                 @InjectModel(Invite) private inviteRepository: typeof Invite){

    }

    async makePost(id: number, body:any): Promise<Event> {
        const event = await this.eventRepositiry.create({userId: id, title: body.title, date: body.date})
        return event
    }



    async getAllEvents(){
        const event = await this.eventRepositiry.findAll()
        return event
       
    }

    async getEventById(id: number){
        const event = await this.eventRepositiry.findAll({where: {userId:id}})
        return event

    }

    async updateEvent(idOfUser: number, body: any): Promise<Event>{
        const event = await this.eventRepositiry.update({title: body.title, date: body.date}, {where:{userId: idOfUser} && {id: body.id}})
        return 

    }

    async deleteEvent(idOfUser: number, body: any): Promise<Event>{
        const event = await this.eventRepositiry.destroy({where:{userId: idOfUser} && {id: body.id}})
        return

    }

    async makeInvite(idOfUser: number, body: any): Promise<Event>{
        const event = await this.userRepository.findOne({where:{username: body.username}})
        if(!event){
            throw new UnauthorizedException({messege: 'wrong password, email or username'})
        }
        const invite = await this.inviteRepository.create({eventId: body.eventId, userId: body.userId})
        return
    }
    async getInvitesById(id: number){
        const event = await this.inviteRepository.findAll({where: {userId:id}})
        return event


    }

    async isAccepted(id: string, answer: string, body: any): Promise<Event>{
        if(answer === 'accept'){
            const event = await this.inviteRepository.update({isAccepted: true}, {where: {userId: id, eventId: body.eventId}})
            return
        }
        if(answer === 'decline'){
            const event = await this.inviteRepository.update({isAccepted: false}, {where: {userId: id, eventId: body.eventId}})
            return
        
        }

}   }
