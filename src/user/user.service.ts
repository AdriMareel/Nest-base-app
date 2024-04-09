import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/auth';

@Injectable()
export class UserService {
  constructor(private prisma : PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username: username
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: updateUserDto.password
      }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }

  getPosts(id: number) {
    return this.prisma.post.findMany({
      where: {
        authorId: id
      }
    })
  }
}
