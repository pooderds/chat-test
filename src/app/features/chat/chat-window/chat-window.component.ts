import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageListComponent } from './message-list/message-list.component';
import { ChatInputControlComponent } from './chat-input-control/chat-input-control.component';
import { ChannelStateService } from '../../../core/services/state/channel-state/channel-state.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { AddHashPipe } from '../../../shared/pipes/add-hash/add-hash.pipe';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    MessageListComponent,
    ChatInputControlComponent,
    NgIf,
    AsyncPipe,
    AddHashPipe,
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  private channelService = inject(ChannelStateService);

  readonly selectedChannel$ = this.channelService.selectedChannel$
}
