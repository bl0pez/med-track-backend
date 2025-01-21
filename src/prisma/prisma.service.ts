import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { Hasher } from 'src/interfaces';
import { BcryptPlugin } from 'src/plugins/bcrypt.plugin';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private hasher: Hasher;
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
    this.hasher = new BcryptPlugin();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');

    const users = await this.user.findMany();

    if (!users.length) {
      const users = [
        {
          email: 'test@gmail.com',
          password: this.hasher.hash('123456'),
          name: 'test',
          roles: [Role.MAINTENANCE],
        },
        {
          email: 'admin@gmail.com',
          password: this.hasher.hash('123456'),
          name: 'admin',
          roles: [Role.ADMIN],
        },
        {
          email: 'user@gmail.com',
          password: this.hasher.hash('123456'),
          name: 'user',
          roles: [Role.USER],
        },
      ];

      for (const user of users) {
        await this.user.create({ data: user });
      }

      this.logger.log('Created default users');
    }

    const systemMetrics = await this.systemMetrics.findMany();

    if (!systemMetrics.length) {
      await this.systemMetrics.create({
        data: {}
      });

      this.logger.log('Created default system metrics');
    }

  }
}
