import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { UserStateService } from '../../../core/services/state/user-state/user-state.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  concatMap,
  map,
  combineLatest,
  filter,
  catchError,
  EMPTY,
  tap,
} from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChannelStateService } from '../../../core/services/state/channel-state/channel-state.service';

import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { User } from '../../../core/models/user.interface';
import { UserChannelStateService } from '../../../core/services/state/user-channel-state/user-channel-state.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import {
  NotificationMessageSeverity,
  NotificationMessageTitle,
} from '../../../shared/constants';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ListboxModule,
    AsyncPipe,
    NgIf,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    NgClass,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  private messageService = inject(MessageService);
  private channelService = inject(ChannelStateService);
  private userChannelService = inject(UserChannelStateService);
  private userService = inject(UserStateService);

  readonly selectedChannel$ = this.channelService.selectedChannel$;
  readonly usersInChannel$ = this.userService.usersInChannel$;
  private selectedUser?: User;

  readonly usersToInvite$ = combineLatest([
    this.userService.users$,
    this.userChannelService.userChannels$,
    this.channelService.selectedChannel$,
  ]).pipe(
    map(([users, userChannels, channelSelected]) => {
      const userIdsInChannel = userChannels
        .filter(({ channel_id }) => channel_id === channelSelected?.id)
        .map(({ user_id }) => user_id);

      return users.filter(({ id }) => !userIdsInChannel.includes(id));
    }),
  );

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedUserName: new FormControl<string>('', { nonNullable: true }),
    });
  }

  saveSelectedUser({ value }: DropdownChangeEvent) {
    this.selectedUser = value;
  }

  inviteUserToChannel() {
    this.channelService.selectedChannel$
      .pipe(
        map((channel) => channel?.id),
        filter(Boolean),
        concatMap((id) => {
          if (!this.selectedUser?.id) {
            throw 'User is not selected';
          }
          return this.userChannelService.inviteUserToChannel({
            channel_id: id,
            user_id: this.selectedUser?.id,
          });
        }),
        tap(() =>
          this.messageService.add({
            severity: NotificationMessageSeverity.info,
            summary: NotificationMessageTitle.info,
            detail: 'User added to channel!',
          }),
        ),
        catchError((err) => {
          this.messageService.add({
            severity: NotificationMessageSeverity.error,
            summary: NotificationMessageTitle.error,
            detail: err,
          });
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
