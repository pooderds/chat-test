import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { UserDataService } from '../../data-access/user-data/user-data.service';
import { User } from '../../../models/user.interface';
import { ChannelStateService } from '../channel-state/channel-state.service';
import { UserChannelStateService } from '../user-channel-state/user-channel-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private dataSource = inject(UserDataService);

  private channelService = inject(ChannelStateService);
  private userChannelService = inject(UserChannelStateService);

  private usersSubject = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject.asObservable();

  usersInChannel$ = combineLatest([
    this.channelService.selectedChannel$,
    this.users$,
    this.userChannelService.userChannels$,
  ]).pipe(
    filter(Boolean),
    map(([selectedChannel, users, userChannels]) => {
      const userIdsInChannel = userChannels
        .filter(({ channel_id }) => channel_id === selectedChannel?.id)
        .map(({ user_id }) => user_id);

      return users.filter(({ id }) => userIdsInChannel.includes(id));
    }),
  );

  init(): void {
    this.dataSource
      .getUsers()
      .subscribe((users) => this.usersSubject.next(users));
  }

  updateUser(user: User): Observable<User> {
    return this.dataSource.updateUser(user);
  }
}
