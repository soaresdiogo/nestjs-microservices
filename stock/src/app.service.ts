import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public consumeMessage(message: string): void {
    console.log(`Message received: ${message}`);
  }
}