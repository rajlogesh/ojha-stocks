import { Injectable } from '@angular/core';
import { SettingsService } from '../../Services/settings-service/settings.service';
import { CommonHelperService } from '../../Helpers/common-helper/common-helper.service';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsBusinessService {

  constructor(
    private settingsService: SettingsService,
    private commonHelper: CommonHelperService,
    private httpHelper: HttpHelperService,
    private sanitize: DomSanitizer
  ) { }

  fetchProfileDetails() {
    const userId = this.commonHelper.getUserId();
    return this.settingsService.fetchProfileDetails(userId);
  }

  userChangePassword(payload) {
    return new Promise((resolve, reject) => {
      const userId = this.commonHelper.getUserId();
      payload['userId'] = userId;
      this.settingsService.changePassword(payload)
        .subscribe((response) => {
          console.log(response);
          if (response['token'] !== null) {
            const apiToken = response['token'];
            this.httpHelper.setAccessToken(apiToken);
            resolve(true);
          } else {
            reject(false);
          }
        }, (error) => {
          reject(false);
        });
    });
  }

  getTenantLogo() {
    return new Promise((resolve, reject) => {
      const tenantId = this.commonHelper.getTenantId();
      this.settingsService.getTenantLogo(tenantId)
        .subscribe((response) => {
          const logoPath = this.sanitizeLogo(response);
          resolve(logoPath);
        }, (error) => {
          reject('');
        });
    });
  }

  uploadTenantLogoToServer(image) {
    const tenantId = this.commonHelper.getTenantId();
    return this.settingsService.uploadTenantLogoToServer(image, tenantId);
  }

  getCurrentAPIKey() {
    return this.httpHelper.getAPIKey();
  }

  getInitialAPIKey(){
    return this.settingsService.getAPIKey();
  }

  refreshAPIKey() {
    console.log(this.settingsService.refreshAPIKey());
    return this.settingsService.refreshAPIKey();
  }

  deleteAPIKey() {
    return this.settingsService.deleteAPIKey();
  }

  private sanitizeLogo(response) {
    const logoB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
    const logoPath = this.sanitize.bypassSecurityTrustResourceUrl('data:image/png;base64,'+logoB64);
    return logoPath;
  }

}
