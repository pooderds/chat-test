import { TestBed } from '@angular/core/testing';
import { MessageDataService } from './message-data.service';



describe('MessagesDataService', () => {
  let service: MessageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
