import { Injectable } from '@angular/core';
import { AuthBusinessService } from '../../Core/Business/Auth/auth-business.service';


@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(
    private authBusiness: AuthBusinessService
  ) { }

  login(username: string, password: string) {
    return this.authBusiness.login(username, password);
  }

  loginRedirect() {
    this.authBusiness.loginRedirect();
  }

  logout() {
    this.authBusiness.logout();
  }

  validateInvitation(email: string, invitationToken: string) {
    return this.authBusiness.validateInvitation(email, invitationToken);
  }

  RegisterAndLoginInvitee(payload) {
    return this.authBusiness.RegisterAndLoginInvitee(payload);
  }

  getUserInformation() {
    return this.authBusiness.getUserInformation();
  }

}
