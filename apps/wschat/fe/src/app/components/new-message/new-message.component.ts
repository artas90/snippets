import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'wsc-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {
  message = new FormControl('', Validators.required);

  constructor(
    private messagesService: MessagesService,
  ) {}

  
  mention(nickname) {
    this.message.setValue(this.message.value + ' @' + nickname + ' ');
  }

  submit() {
    this.messagesService.addMessage(this.message.value);
    this.message.setValue('');
  }
}
