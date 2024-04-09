import { AuthService } from 'src/auth/auth.service';
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { NoAuthRequired } from './no-auth-required.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @NoAuthRequired()
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}