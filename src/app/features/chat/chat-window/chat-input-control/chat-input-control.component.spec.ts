import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputControlComponent } from './chat-input-control.component';

describe('ChatInputControlComponent', () => {
  let component: ChatInputControlComponent;
  let fixture: ComponentFixture<ChatInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
