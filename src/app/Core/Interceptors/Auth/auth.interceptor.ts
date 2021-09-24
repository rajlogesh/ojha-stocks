import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let _isAuthUrl = this.IsAuthRequired(request.url.toString());
    let _dataType = this.decideDataType(request.url.toString());

    let reqCloneOptions = {};
    let _params = request.params;
    let headers = {};

    if (_isAuthUrl) {
      _params.append('tenantId', environment.tenantId);
      const _token = this.getApiToken();
      headers['Authorization'] = 'Bearer ' + _token;
    }

    if(_dataType === 'text'){
      headers['ContentType'] = 'text/plain';
    }
    else{
      headers['ContentType'] = 'application/json';
      headers['Content-Type'] = 'application/json';
      headers['Access-Control-Allow-Credentials'] = 'true';
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE';
      headers['Access-Control-Max-Age'] = '3600';
      headers['Access-Control-Allow-Headers'] = 'ContentType, Content-Type, Accept, X-Requested-With, remember-me';
    }

    const requestHeaders = this.getRequestHeaders(request);
    headers = $.extend(requestHeaders,headers);

    reqCloneOptions = {
      headers: new HttpHeaders(headers),
      params: _params
    }

    let reqClone = request.clone(reqCloneOptions);
    return next.handle(reqClone);
  }

  private getRequestHeaders(request) {
    const headerKeys = request.headers.keys();
    let requestHeaders = {};
    headerKeys.forEach((_key) => {
      requestHeaders[_key] = request.headers.get(_key);
      if(_key == 'Origin') {
        requestHeaders['Access-Control-Allow-Origin'] = request.headers.get(_key);
      }
    });
    return requestHeaders;
  }

  private getApiToken() {
    return localStorage.getItem('apiToken');
  }

  private IsAuthRequired(request){
    let _isNeeded:boolean;
    switch(true){
      case (request.indexOf('authentication') > 0):
            _isNeeded = true;
            break;
      case (request.indexOf('edges/certificates') > 0 ):
            _isNeeded = true;
            break;
      case (request.indexOf('changePassword/admin') > 0 ):
            _isNeeded = false;
            break;
      case (request.indexOf('/globalshares/ojha/profile/v1/login/user') > 0 ):
            _isNeeded = false;
            break;
      case (request.indexOf('/globalshares/ojha/companydetails/v1/getall/comapany') > 0 ):
            _isNeeded = false;
            break;
      default:
            _isNeeded = true;
            break;
    }
   return _isNeeded;
  }

  private decideDataType(request){
    let _type = ' ';
    switch(true){
      case (request.indexOf('authentication') > 0):
          _type = 'json';
          break;
      case (request.indexOf('edges/certificates') > 0) :
          _type = 'text';
          break;
      case (request.indexOf('changePassword/admin') > 0) :
          _type = 'json';
          break;
      default:
          _type = 'json';
          break;
    }
   return _type;
  }

}
