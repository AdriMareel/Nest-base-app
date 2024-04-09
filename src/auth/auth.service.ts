import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { compareHashes } from 'src/utils/auth';

@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService : JwtService) {}

    async validateUser(username : string, password : string) {
        const user = await this.userService.findOneByUsername(username);
        
        const comparison = await compareHashes(password, user.password);

        if (user && comparison) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user : User){
        const payload = { username : user.username, sub : user.id };
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
