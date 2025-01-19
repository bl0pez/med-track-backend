import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Hasher } from 'src/interfaces';
import { BcryptPlugin } from 'src/plugins/bcrypt.plugin';

@Injectable()
export class UserService {

  private hasher: Hasher;

  constructor(private readonly prismaService: PrismaService) {
    this.hasher = new BcryptPlugin();
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('Correo electrónico ya registrado');
    }

    const hashedPassword = this.hasher.hash(createUserDto.password);

    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        roles: createUserDto.roles,
      }
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })

    if (!user) {
      return null;
    }

    return user;
  }

}
