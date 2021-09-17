import { Injectable } from '@angular/core';
import { SettingsBusinessService } from 'src/app/Core/Business/Settings/settings-business.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsFacadeService {

  constructor(
    public settingsBusiness: SettingsBusinessService
  ) { }

  fetchProfileDetails() {
    return this.settingsBusiness.fetchProfileDetails();
  }

  updatePassword(payload) {
    return this.settingsBusiness.userChangePassword(payload);
  }

  getTenantLogo() {
    return this.settingsBusiness.getTenantLogo();
  }

  uploadTenantLogoToServer(image) {
    return this.settingsBusiness.uploadTenantLogoToServer(image);
  }

  getCurrentAPIKey() {
    return this.settingsBusiness.getCurrentAPIKey();
  }

  getInitialAPIKey(){
    return this.settingsBusiness.getInitialAPIKey();
  }
  refreshAPIKey() {
    return this.settingsBusiness.refreshAPIKey();
  }

  deleteAPIKey() {
    return this.settingsBusiness.deleteAPIKey();
  }

}
