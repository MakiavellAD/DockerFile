import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,createParamDecorator } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){

    }


    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({messege: 'no auth user'}) 
            }
            try{

            req.user = await this.jwtService.verifyAsync(token);
        }catch(e){
            console.log(process.env.PRIVATE_KEY)
            throw new UnauthorizedException({messege: e})

        }
            return true; 
    }
}

  

  
