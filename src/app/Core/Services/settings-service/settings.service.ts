import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
    private httpHelper: HttpHelperService
  ) { }

  fetchProfileDetails(userId) {
    const apiUrl = this.httpHelper.apiUrl(`users/${userId}`);
    return this.http.get(apiUrl);
  }

  changePassword(payload) {
    const apiUrl = this.httpHelper.apiUrl(`authentication/users/changePassword`);
    return this.http.post(apiUrl, payload);
  }

  getTenantLogo(tenantId) {
    const apiUrl = this.httpHelper.apiUrl(`tenant/${tenantId}/logo`);
    return this.http.get(apiUrl, { responseType: 'arraybuffer' });
  }

  uploadTenantLogoToServer(image, tenantId) {
    const apiUrl = this.httpHelper.apiUrl(`tenant/${tenantId}/logo`);
    const formData = new FormData();
    formData.append('image', image);
    return this.http.put(apiUrl, formData);
  }

  getAPIKey() {
    const apiUrl = this.httpHelper.apiUrl(`users/apiKey`);
    return this.http.get(apiUrl);
  }

  refreshAPIKey() {
    const apiUrl = this.httpHelper.apiUrl(`users/apiKey`);
    return this.http.put(apiUrl, '');
  }

  deleteAPIKey() {
    const apiUrl = this.httpHelper.apiUrl(`users/apiKey`);
    return this.http.delete(apiUrl);
  }

}
