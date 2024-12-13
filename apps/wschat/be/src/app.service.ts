import { Injectable } from '@nestjs/common';
import { MessagesDB } from './db/messages.db';

@Injectable()
export class AppService {
  nicknames(): string[] {
    return[...MessagesDB.nicknames.values()];
  }
}
