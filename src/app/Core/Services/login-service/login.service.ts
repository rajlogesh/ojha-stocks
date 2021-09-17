import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';
import { LoginUserRequest } from '../../Models/login-user-request.model';
import { InvitationValidationRequest } from '../../Models/invitation-validation-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private httpHelper: HttpHelperService
  ) { }

  login(username: string, password: string) {
    const apiUrl = this.httpHelper.apiUrl('/globalshares/ojha/profile/v1/login/user');
    const body: LoginUserRequest = {
      username: username,
      password: password
    };
    console.log("to check")
    console.log(apiUrl)
    console.log (body)
    console.log(this.http.post(apiUrl, body))
    return this.http.post(apiUrl, body);
  }

  renewAccessToken() {
    const apiUrl = this.httpHelper.apiUrl('authentication/users/renewToken');
    const accessToken = this.httpHelper.getAccessToken();
    const body = {
      "token": accessToken
    };
    return this.http.put(apiUrl, body);
  }

  validateInvitation(email: string, invitationCode: string) {
    const apiUrl = this.httpHelper.apiUrl('validateInvitation');
    const body: InvitationValidationRequest = {
      inviteeId: email,
      email: email,
      invitationCode: invitationCode
    };
    return this.http.post(apiUrl, body);
  }

  registerInvitee(payload) {
    const apiUrl = this.httpHelper.apiUrl('registerInvitee');
    return this.http.post(apiUrl, payload);
  }

  getUserInfo(userId) {
    const apiUrl = this.httpHelper.apiUrl('users/' + userId);
    return this.http.get(apiUrl);
  }

}
