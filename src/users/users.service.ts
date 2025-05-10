import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Hasher } from 'src/interfaces';
import { BcryptPlugin } from 'src/plugins/bcrypt.plugin';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';

@Injectable()
export class UsersService {
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
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const isPagination = paginationDto.page && paginationDto.limit;
    const isNumber = !isNaN(Number(paginationDto.search));

    const users = await this.prismaService.user.findMany({
      skip: isPagination && (paginationDto.page - 1) * paginationDto.limit,
      take: isPagination && paginationDto.limit,
    });

    const count = await this.prismaService.user.count({});

    return {
      data: users,
      metadata: createPagination({
        page: paginationDto.page,
        rowsPerPage: paginationDto.limit,
        count: users.length,
        totalCount: count,
      }),
    };
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
    });

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
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
