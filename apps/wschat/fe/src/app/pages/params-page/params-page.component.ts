import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'wsc-params-page',
  templateUrl: './params-page.component.html',
  styleUrls: ['./params-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamsPageComponent {
  nickname = new FormControl('', Validators.required);

  constructor(
    private messagesService: MessagesService
  ) {}

  submit() {
    this.messagesService.setNickname(this.nickname.value);
  }
}
