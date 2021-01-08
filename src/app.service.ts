import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'There should be a ReactJS file, but we do not have a frontend :^)';
  }
}
