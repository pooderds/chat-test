import { inject, Injectable } from '@angular/core';
import { MessageDataService } from '../../data-access/message-data/message-data.service';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { Message } from '../../../models/message.interface';
import { ChannelStateService } from '../channel-state/channel-state.service';

@Injectable({
  providedIn: 'root',
})
export class MessageStateService {
  private dataSource = inject(MessageDataService);

  private channelService = inject(ChannelStateService);

  private messageSubject = new BehaviorSubject<Message[]>([]);
  readonly messages$ = this.messageSubject.asObservable();

  activeChannelMessages$ = this.channelService.selectedChannel$.pipe(
    filter(Boolean),
    switchMap(({ id }) => {
      return this.messages$.pipe(
        map((mes) => mes.filter((m) => m.channel_id === id)),
      );
    }),
  );

  init(): void {
    this.dataSource.getMessages().subscribe((messages) => {
      this.messageSubject.next(messages);
    });
  }

  sendMessage(msg: Message): Observable<Message> {
    const sendMessage = this.dataSource.createMessage(msg);
    const messages = this.messageSubject.getValue();
    this.messageSubject.next([...messages, msg]);
    return sendMessage;
  }
}
