import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../../../../Core/Validators/confirmPassword.validator';


@Component({
  selector: 'app-confirm-invitation',
  templateUrl: './confirm-invitation.component.html',
  styleUrls: ['./confirm-invitation.component.scss']
})
export class ConfirmInvitationComponent implements OnInit {

  
  private _invitee;
  confirmInvitationForm;
  @Output('RALInvitee') RALInvitee = new EventEmitter();
  @Input('inviteeLoginError') inviteeLoginError;
  @Input('inviteeRegistrationError') inviteeRegistrationError;

  @Input('invitee')
  set invitee(data) {
    this._invitee = data;
    this.confirmInvitationForm.get('firstName').setValue(this.invitee.firstName);
    this.confirmInvitationForm.get('lastName').setValue(this.invitee.lastName);
    this.confirmInvitationForm.get('emailId').setValue(this.invitee.email);
    this.confirmInvitationForm.get('invitationCode').setValue(this.invitee.invitationCode);
  }

  get invitee() {
    return this._invitee;
  }

  constructor(
    public fb: FormBuilder
  ) {
    this.registerConfirmInvitationFormControl();
  }

  ngOnInit(): void {}

  registerConfirmInvitationFormControl() {
    this.confirmInvitationForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      invitationCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  get CIFormControls() {
    return this.confirmInvitationForm.controls;
  }

  confirmInvitation() {
    const payload = {
      "inviteeId": this.confirmInvitationForm.value.emailId,
      "email": this.confirmInvitationForm.value.emailId,
      "firstName": this.confirmInvitationForm.value.firstName,
      "lastName": this.confirmInvitationForm.value.lastName,
      "password": this.confirmInvitationForm.value.password,
      "invitationCode": this.confirmInvitationForm.value.invitationCode
    };
    this.RALInvitee.emit(payload);
  }

}
