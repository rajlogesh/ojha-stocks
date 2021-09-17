import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  signin_form;
  @Output('signInEvent')
  signInEvent = new EventEmitter();
  @Input('loginError')
  loginError;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerLoginFormControl();
  }

  registerLoginFormControl() {
    this.signin_form = this.fb.group({
      user: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get signInFormControls() {
    return this.signin_form.controls;
  }

  normalSignIn() {
  	console.log("inside")
    const payload = {
      'userId': this.signin_form.value.user,
      'password': this.signin_form.value.password
    };
    console.log(payload)
    this.signInEvent.emit(payload);
  }

}
