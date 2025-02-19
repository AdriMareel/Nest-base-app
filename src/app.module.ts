import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    //enable the JwtAuthGuard on all endpoints
    {
      provide : APP_GUARD,
      useClass : JwtAuthGuard
    }
  ],
})
export class AppModule {}
