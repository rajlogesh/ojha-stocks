import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/Core/Validators/confirmPassword.validator';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  FPForm;
  loading = false;
  passwordUpdatedMsg = 'none';
  @Input('IPU$') IPU$: Observable<string>;
  @Output('updatePassword') updatePasswordEvent = new EventEmitter();
  IPU$Subscription: Subscription;

  constructor(
    public fb: FormBuilder
  ) {
    this.registerFPFormControl();
  }

  ngOnInit(): void {
    this.listenIPU$Changes();
  }

  ngOnDestroy(): void {
    this.IPU$Subscription.unsubscribe();
  }

  listenIPU$Changes() {
    if(this.IPU$ !== undefined){
      this.IPU$Subscription = this.IPU$.subscribe((currentState: string) => {
        this.loading = false;
        if (currentState === 'success') {
          this.showFeedback('success');
        } else if ( currentState === 'failed' ) {
          this.showFeedback('failure');
        }
      });
    }
  }

  registerFPFormControl() {
    this.FPForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  get FPFormControls() {
    return this.FPForm.controls;
  }

  updatePassword() {
    this.loading = true;
    const payload = {
      newPassword: this.FPForm.get('password').value,
      currentPassword: this.FPForm.get('currentPassword').value
    };
    this.updatePasswordEvent.emit(payload);
  }

  private showFeedback(status) {
    this.passwordUpdatedMsg = status;
    setTimeout(() => {
      this.passwordUpdatedMsg = 'none';
    }, environment.errorMsgDly);
  }

}
