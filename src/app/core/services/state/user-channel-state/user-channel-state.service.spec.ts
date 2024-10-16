import { TestBed } from '@angular/core/testing';

import { UserChannelStateService } from './user-channel-state.service';

describe('UserChannelStateService', () => {
  let service: UserChannelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChannelStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
