import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageStateService } from '../../../../core/services/state/message-state/message-state.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Message } from '../../../../core/models/message.interface';
import { UserStateService } from '../../../../core/services/state/user-state/user-state.service';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent, AsyncPipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
})
export class MessageListComponent implements OnInit {
  private messageService = inject(MessageStateService);
  private userService = inject(UserStateService);

  readonly activeChannelMessages$ = this.messageService.activeChannelMessages$;

  ngOnInit(): void {
    this.messageService.init();
  }

  getUsernameById(userId: string) {
    return this.userService.users$.pipe(
      map((users) => users.find((user) => user.id === userId)?.username || ''),
    );
  }

  appendMessage(
    messages: Message[],
    index: number,
    userId: string,
  ): Observable<string> {
    if (index === 0) {
      return this.getUsernameById(userId);
    }
    return messages[index - 1].from_user === userId
      ? new Observable()
      : this.getUsernameById(userId);
  }
}
