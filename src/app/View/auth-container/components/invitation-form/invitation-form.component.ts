import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnInit {

  invitation_form;
  @Output('invitationSignIn') 
  invitationEvent = new EventEmitter();
  @Input('invitationError')
  invitationError;

  constructor(
    public fb: FormBuilder
  ) {
    this.registerInvitationFormControl();
  }

  ngOnInit(): void { }

  registerInvitationFormControl() {
    this.invitation_form = this.fb.group({
      mfaCode: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get invitationFormControls() {
    return this.invitation_form.controls;
  }

  invitationSignIn() {
    const payload = {
      'mfaCode': this.invitation_form.value.mfaCode
    };
    this.invitationEvent.emit(payload);
  }

}
