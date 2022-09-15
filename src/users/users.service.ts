import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Where } from 'sequelize/types/utils';
import { CreateUserDto } from './dto /create-user.dto';
import { User } from './users.model';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){

    }

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        return user;

    }

    async getEmail(email:string){
        const findEmail = await this.userRepository.findOne({where: {email}})
        return findEmail
    }

    async getUserName(username:string){
        const findUsername = await this.userRepository.findOne({where: {username}})
        return findUsername
    }
}
