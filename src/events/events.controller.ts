import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Event } from './event.model';
import { User } from 'src/users/users.model';
import {JwtService} from "@nestjs/jwt";
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import { IdEventDto } from './dto/id-event.dto';
import { UsersService } from 'src/users/users.service';
import { TokenData } from 'src/auth/event.decorator';




@Controller('events')
export class EventsController {

    constructor(private EventsService: EventsService){
    }

    
    
    @UseGuards(JwtAuthGuard)
    @Post('/makeEvent')
    makePost(@Body() body: any, @TokenData() tokenData: CreateEventDto,): Promise<Event>{
        return this.EventsService.makePost(tokenData.id, body)


    }


    @UseGuards(JwtAuthGuard)
    @Get('/myEvents')
    getById(@TokenData() tokenData: CreateEventDto){
        return this.EventsService.getEventById(tokenData.id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/updateEvent')
    updateEvent(@Body() body: any, @TokenData() tokenData:CreateEventDto,): Promise<Event>{
        return this.EventsService.updateEvent(tokenData.id, body)


    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deleteEvent')
    deleteEvent(@Body() body: any, @TokenData() tokenData: CreateEventDto): Promise<Event>{
        return this.EventsService.deleteEvent(tokenData.id, body)
        
    }

    @UseGuards(JwtAuthGuard)
    @Post('/makeInvite')
    makeInvite(@Body() body: any, @TokenData() tokenData: CreateEventDto): Promise<Event>{
        return this.EventsService.makeInvite(tokenData.id, body)
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getInvites')
    showInvites(@Body() body: any, @TokenData() tokenData: CreateEventDto){
        return this.EventsService.getInvitesById(tokenData.id)

    }

    @UseGuards(JwtAuthGuard)
    @Patch('/acceptInvite')
    isAccepted(@Body() body: any, answer: string, @TokenData() tokenData: CreateEventDto): Promise<Event>{
        return this.EventsService.isAccepted(answer, body, tokenData.id)
        
    }

}


