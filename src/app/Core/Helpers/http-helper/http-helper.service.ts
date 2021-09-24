import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() { }

  getTenantId() {
    const access_token = localStorage.getItem('apiToken');
   // console.log('decodedToken-->', access_token);
    if (access_token) {
      const decodedToken = jwt_decode(access_token);
      //console.log('decodedToken->tenantId', decodedToken.tenantId);
      return decodedToken.tenantId;
    }
    return '';
  }

  apiUrl(path: string) {
    if (!environment.production || environment.production) {
      const protocol = environment.apiProtocol;
      const domain = environment.apiUrl;
      return protocol + '://' + domain + path;
    } else {
      const locationHostArray = window.location.host.split('.');
      const tenantFromHost = locationHostArray[0];
      let apiUrl: string;

      let pathName = window.location.pathname;
      pathName = pathName.slice(1, -1);
      let pathNameArr: any = pathName.split('/');
      pathNameArr.pop();
      pathNameArr = '/' + pathNameArr.join('/') + '/';

      if (tenantFromHost && !this.getTenantId() && pathNameArr.includes('/a/') === true) {
        apiUrl = window.location.origin + pathName + 'api/' + path;
        //console.log('pathNameArr---', apiUrl);
        return apiUrl;
      } else if (tenantFromHost && !this.getTenantId() && pathNameArr.includes('/a/') === false) {
        apiUrl = window.location.origin + '/a/' + tenantFromHost + '/api/' + path;
       // console.log('tenantFromHost---', apiUrl);
        return apiUrl;
      } else if (this.getTenantId() && tenantFromHost && pathNameArr.includes('/a/') === false ) {
         apiUrl = window.location.origin + '/a/' + this.getTenantId() + '/api/' + path;
        // console.log('getTenantId---', apiUrl);
         return apiUrl;
      }
    }
  }
  getAccessToken() {
    return localStorage.getItem('apiToken');
  }

  setAccessToken(value: string) {
    return localStorage.setItem('apiToken', value);
  }

  getAPIKey() {
    const lsAPIKey = localStorage.getItem('apiKey');
    return lsAPIKey;
  }

}
