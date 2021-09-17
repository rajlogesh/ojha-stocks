import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/Facades/auth-facade/auth-facade.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  is_invited = false;
  loading = false;
  loginError = false;
  invitationError = false;
  invitee;
  confirmInvitee = false;
  inviteeRegistrationError = false;
  inviteeLoginError = false;

  constructor(
    private authFacade: AuthFacadeService
  ) {}

  ngOnInit(): void { }

  toggleInvitation() {
    this.is_invited = !this.is_invited;
  }

  normalSignIn(payload) {
    
   this.loading = true;
   this.authFacade.login(payload['userId'], payload['password']) 
   .then(data => {
   this.loading = false;
        this.authFacade.loginRedirect();
     })
     .catch(error => {
     this.loading = false;
         this.loginError = true;
         setTimeout(() => { this.loginError = false; }, environment.errorMsgDly);
       });
  }

  invitationSignIn(payload) {
    this.loading = true;
    this.authFacade
      .validateInvitation(payload['email'], payload['invitationCode'])
      .then((response) => {
        this.loading = false;
        this.invitee = response;
        this.confirmInvitee = true;
      })
      .catch((error) => {
        this.loading = false;
        this.invitationError = true;
        setTimeout(() => { this.invitationError = false; }, environment.errorMsgDly);
      });
  }

  RALInvitee(payoad) {
    this.loading = true;
    this.authFacade.RegisterAndLoginInvitee(payoad)
      .then(response => {
        this.loading = false;
        if (response === false) {
          this.inviteeLoginError = true;
          setTimeout(() => { this.inviteeLoginError = false; }, environment.errorMsgDly);
        }
      })
      .catch(error => {
        this.loading = false;
        this.inviteeRegistrationError = true;
        setTimeout(() => { this.inviteeRegistrationError = false; }, environment.errorMsgDly);
      });
  }

}
