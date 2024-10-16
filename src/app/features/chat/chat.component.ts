import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UserListComponent } from './user-list/user-list.component';
import { DividerModule } from 'primeng/divider';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatNavbarComponent,
    ChannelListComponent,
    ChatWindowComponent,
    UserListComponent,
    DividerModule,
    AsyncPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
