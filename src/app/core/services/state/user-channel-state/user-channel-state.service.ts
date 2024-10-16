import { inject, Injectable } from '@angular/core';
import { UsersChannelDataService } from '../../data-access/user-channel-data/users-channel-data.service';
import { UserChannel } from '../../../models/user-channel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserChannelStateService {
  private dataSource = inject(UsersChannelDataService);

  private userChannelsSubject = new BehaviorSubject<UserChannel[]>([]);
  readonly userChannels$ = this.userChannelsSubject.asObservable();

  init() {
    this.dataSource.getUserChannels().subscribe((userChannels) => {
      this.userChannelsSubject.next(userChannels);
    });
  }

  inviteUserToChannel(userChannel: UserChannel) {
    const response = this.dataSource.createUserChanel(userChannel);
    const userChannels = this.userChannelsSubject.getValue();
    this.userChannelsSubject.next([...userChannels, userChannel]);
    return response;
  }
}
