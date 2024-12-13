import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserMessage } from '../../services/messages.service';

@Component({
  selector: 'wsc-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMessageComponent {
  @Input() message: UserMessage;
  @Input() isOdd: boolean;
}
