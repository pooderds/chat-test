import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageStateService } from '../../../../core/services/state/message-state/message-state.service';
import { AuthService } from '../../../auth/auth.service';
import { ChannelStateService } from '../../../../core/services/state/channel-state/channel-state.service';
import {catchError, combineLatest, concatMap, EMPTY} from 'rxjs';
import { v4 } from 'uuid';

@Component({
  selector: 'app-chat-input-control',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './chat-input-control.component.html',
  styleUrl: './chat-input-control.component.scss',
})
export class ChatInputControlComponent implements OnInit {
  private messageService = inject(MessageStateService);
  private authService = inject(AuthService);
  private channelService = inject(ChannelStateService);

  messageForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      content: new FormControl('', {
        validators: [Validators.minLength(1), Validators.required],
      }),
    });
  }

  onSubmit() {
    const { content } = this.messageForm.value;

    combineLatest([
      this.authService.authUser$,
      this.channelService.selectedChannel$,
    ])
      .pipe(
        concatMap(([user, channel]) => {
          if (!user || !channel) {
            throw 'An error occurred';
          }
          return this.messageService.sendMessage({
            content,
            from_user: user.id,
            channel_id: channel.id,
            id: v4(),
          })
        }),
        catchError(() => EMPTY)
      )
      .subscribe();
    this.messageForm.reset('');
  }
}
