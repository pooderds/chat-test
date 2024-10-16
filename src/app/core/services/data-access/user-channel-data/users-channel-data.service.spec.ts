import { TestBed } from '@angular/core/testing';

import { UsersChannelDataService } from './users-channel-data.service';

describe('UsersChannelsService', () => {
  let service: UsersChannelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersChannelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
