import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidationErrorsDirective } from '../../../shared/directives/validation-errors.directive';
import { catchError, EMPTY, tap } from 'rxjs';
import {
  NotificationMessageSeverity,
  NotificationMessageTitle,
} from '../../../shared/constants';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    ValidationErrorsDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  private router = inject(Router);

  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .logIn(this.loginForm.value)
        .pipe(
          tap(() =>
            this.messageService.add({
              severity: NotificationMessageSeverity.success,
              summary: NotificationMessageTitle.success,
              detail: 'You have successfully logged in',
            }),
          ),
          catchError((err) => {
            this.messageService.add({
              severity: NotificationMessageSeverity.error,
              summary: NotificationMessageTitle.error,
              detail: `${err}`,
            });
            return EMPTY;
          }),
        )
        .subscribe();
      this.router.navigate(['/']);
    }
  }
}
