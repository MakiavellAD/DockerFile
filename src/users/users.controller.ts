import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto /create-user.dto';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService){

    }

    @ApiOperation({summary: 'Create User'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Post('/get')
    create(@Body() userDto: CreateUserDto){
        return this.UsersService.createUser(userDto)
    }


}
