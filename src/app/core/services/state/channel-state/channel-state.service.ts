import { inject, Injectable } from '@angular/core';
import { ChannelDataService } from '../../data-access/channel-data/channel-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel } from '../../../models/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannelStateService {
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  readonly channels$ = this.channelsSubject.asObservable();

  private selectedChannelSubject = new BehaviorSubject<Channel | undefined>(
    undefined,
  );
  readonly selectedChannel$ = this.selectedChannelSubject.asObservable();

  private dataSource = inject(ChannelDataService);

  init(): void {
    this.dataSource.getChannels().subscribe((channels) => {
      this.channelsSubject.next(channels);
    });
  }

  addChannel(channel: Channel): Observable<Channel> {
    const channels = this.channelsSubject.getValue();
    this.channelsSubject.next([...channels, channel]);
    return this.dataSource.createChannel(channel);
  }

  selectChannel(selectedChannel: Channel): void {
    this.selectedChannelSubject.next(selectedChannel);
  }
}
