import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesDB } from 'src/db/messages.db';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {
  handleDisconnect(client: Socket) {
    const nickname = MessagesDB.nicknames.get(client.id);
    client.server.emit('users-changed', {user: nickname, event: 'left'});
    MessagesDB.nicknames.delete(client.id);
  }
  
  @SubscribeMessage('set-nickname')
  setNickname(client: Socket, nickname: string) {
    MessagesDB.nicknames.set(client.id, nickname);
    client.server.emit('users-changed', {user: nickname, event: 'joined'});
  }
  
  @SubscribeMessage('add-message')
  addMessage(client: Socket, message) {
    const nickname = MessagesDB.nicknames.get(client.id) || 'Anonymous';
    client.server.emit('message', {text: message.text, from: nickname, created: new Date()});
  }
}
