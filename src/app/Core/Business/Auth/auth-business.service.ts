import { Injectable } from '@angular/core';
import { LoginService } from '../../Services/login-service/login.service';
import { AuthResponse } from '../../Models/auth-response.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';
import { CommonHelperService } from '../../Helpers/common-helper/common-helper.service';
import { Invitee } from '../../Models/invitee.model';


@Injectable({
  providedIn: 'root'
})
export class AuthBusinessService {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private httpHelper: HttpHelperService,
    private commonHelper: CommonHelperService
  ) { }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.loginService.login(username, password)
      .subscribe((response) => {
      	console.log(response);
        //localStorage.setItem('apiToken', response.headers.get('X-SESSION-TOKEN'));
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth', 'login']);
  }

  loginRedirect() {
    this.router.navigate(['/activity']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      return false;
    } else {
      const decodedToken = jwt_decode(token);
      // Time in milliseconds.
      const issuedTime = parseInt(decodedToken.iat, 10) * 1000;
      const expirationTime = parseInt(decodedToken.exp, 10) * 1000;
      const currentTime = Date.now();

      // Renew token if more than six hours elapsed since issued time.
      if (currentTime - issuedTime > 21600000) {
          this.renewAccessToken()
            .then(response => {
              return response;
            })
            .catch(response => {
              return response;
            });
      }

      return (currentTime < expirationTime);
    }
  }

  renewAccessToken() {
    return new Promise((resolve, reject) => {
      this.loginService.renewAccessToken()
      .subscribe((response) => {
        const accessToken = response['token'];
        this.httpHelper.setAccessToken(accessToken);
        const _isAuthenticated = this.isAuthenticated();
        resolve(_isAuthenticated);
      }, (error) => {
        reject(false);
      });
    });
  }

  validateInvitation(email: string, invitationCode: string) {
    return new Promise((resolve, reject) => {
      this.loginService.validateInvitation(email, invitationCode)
        .subscribe((response: Invitee) => {
          const _isExpired = this.commonHelper.isExpiredNow(response.invitationExpiry);
          if (_isExpired) {
            reject(false);
          } else {
            resolve(response);
          }
        }, (error) => {
          console.log(error);
          reject(false);
        });
    });
  }

  RegisterAndLoginInvitee(payload) {
    return new Promise((resolve, reject) => {
      this.loginService.registerInvitee(payload)
        .subscribe((response) => {
          this.loginService.login(payload['email'], payload['password'])
            .subscribe((response: AuthResponse) => {
              localStorage.setItem('apiToken', response.token);
              this.loginRedirect();
              resolve(true);
            }, error => {
              resolve(false);
            });
        }, (error) => {
          reject(false);
        });
    });
  }

  getUserInformation() {
    const userId = this.commonHelper.getUserId();
    return this.loginService.getUserInfo(userId);
  }

}