import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ScriptModule } from './script.module';
import { UserRepository } from '../module/user/user.repository';
// import { UserService } from '../module/user/user.service';
import { error } from 'console';

class Script {
  private app: INestApplication;
  private readonly logger = new Logger();
  private userRepository: UserRepository;
  //   private userService: UserService;

  async main() {
    try {
      await this.init();
      await this.process();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async init() {
    this.logger.log('init script [START]!!');

    this.app = await NestFactory.create<NestExpressApplication>(ScriptModule);
    this.userRepository = this.app.get<UserRepository>(UserRepository);
    // this.userService = this.app.get<UserService>(UserService);

    this.logger.log('init script [DONE]!!');
  }

  private async process() {
    this.logger.log('process [START]');
    const users = await this.userRepository.findAll();
    console.log('Test script!!!', users);
    this.logger.log('process [DONE]');
  }
}

new Script()
  .main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    const logger = new Logger();
    logger.error(error);
    process.exit(err.code || -1);
  });
