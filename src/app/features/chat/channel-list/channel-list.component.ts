import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AddHashPipe } from '../../../shared/pipes/add-hash/add-hash.pipe';
import { ListboxClickEvent, ListboxModule } from 'primeng/listbox';
import { ChannelStateService } from '../../../core/services/state/channel-state/channel-state.service';
import { v4 as uuidv4 } from 'uuid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {MessageService} from "primeng/api";
import {NotificationMessageSeverity, NotificationMessageTitle} from "../../../shared/constants";

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [
    ListboxModule,
    FormsModule,
    AddHashPipe,
    NgIf,
    AsyncPipe,
    NgClass,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelListComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  private messageService = inject(MessageService);
  private channelService = inject(ChannelStateService);

  readonly channels$ = this.channelService.channels$;

  readonly selectedChannelId$ = this.channelService.selectedChannel$;

  ngOnInit() {
    this.channelService.init();
    this.formGroup = new FormGroup({
      channelName: new FormControl<string>('', {
        validators: [Validators.minLength(1), Validators.required],
      }),
    });
  }

  onCreate() {
    const { channelName } = this.formGroup.value;
    let id = uuidv4();
    this.channelService.addChannel({ name: channelName, id }).subscribe();
    this.formGroup.reset('');
    this.messageService.add({
      severity: NotificationMessageSeverity.info,
      summary: NotificationMessageTitle.info,
      detail: 'Channel added!',
    })
  }

  onSelected({ option }: ListboxClickEvent): void {
    this.channelService.selectChannel(option);
  }
}
