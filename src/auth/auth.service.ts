import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService){

    }


    
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)

    }



    async registration(userDto: CreateUserDto){
        const candidate_email = await this.userService.getEmail(userDto.email)
        const candidate_username = await this.userService.getEmail(userDto.username)
        if(candidate_email){
            throw new HttpException('user with this email already exist', HttpStatus.BAD_REQUEST)
        }
        if(candidate_username){
            throw new HttpException('user with this username already exist', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, username: user.username, id: user.id}
        return{
            token: await this.jwtService.signAsync(payload, {
                expiresIn: '3h',
              }),
        } 
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getEmail(userDto.email)
        const username = await this.userService.getUserName(userDto.username)
        const eqPassword = await bcrypt.compare(userDto.password, user.password)

        if(user && username && eqPassword){
            return user;
        }
        throw new UnauthorizedException({messege: 'wrong password, email or username'})

    }

}
