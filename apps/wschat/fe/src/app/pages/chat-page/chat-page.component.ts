import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewMessageComponent } from 'src/app/components/new-message/new-message.component';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'wsc-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
  constructor(
    private messagesService: MessagesService,
  ) {}

  get list$() {
    return this.messagesService.list$;
  }

  get nicknames$() {
    return this.messagesService.nicknames$;
  }

  mention(newMsg: NewMessageComponent, nickname: string) {
    newMsg.mention(nickname);
  }
}
