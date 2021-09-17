import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {

  constructor() { }

  isExpiredNow(datestring: string) {
    const expiryDate = new Date(datestring).getTime();
    const currentTime = Date.now();
    if (currentTime < expiryDate) {
      return false;
    } else {
      return true;
    }
  }

  getUserId() {
    const access_token = localStorage.getItem('apiToken');
    if (access_token) {
      const decodedToken = jwt_decode(access_token);
      return decodedToken.userId;
    }
    return '';
  }

  getTenantId() {
    const access_token = localStorage.getItem('apiToken');
    if (access_token) {
      const decodedToken = jwt_decode(access_token);
      return decodedToken.tenantId;
    }
    return '';
  }

  converTimeperiodIntoDatetime(timeperiod){
    const returnValue = {
      "latestTime": new Date(Date.now()).toJSON(),
      "earliestTime": new Date(Date.now() - (timeperiod * 60 * 1000)).toJSON()
    };
    return returnValue;
  }

  calculatePageNo(pageNo, pageSize) {
    return ((pageNo * pageSize) + 1);
  }

  hasMorePages(resulCount) {
    if (resulCount >= environment.dataSetLimit) {
      return true;
    } else {
      return false;
    }
  }

  getFileContentType(mi) {
    let contentType = '';
    if (mi.contentType !== null && mi.contentType !== undefined &&
      mi.contentType !== '' && mi.contentType !== 'application/octet-stream') {
      contentType = mi.contentType;
    } else if (mi.label !== null && mi.label !== undefined && mi.label !== '') {
      const index = mi.label.lastIndexOf('.');
      if  (index >= 0) {
        const ext = mi.label.substring(index);
        switch(ext) {
          case '.json':
            contentType = 'application/json';
            break;
          case '.csv':
            contentType = 'text/csv';
            break;
          case '.zip':
            contentType = 'application/zip';
            break;
          case '.pdf':
            contentType = 'application/pdf';
            break;
          case '.txt':
            contentType = 'text/plain';
            break;
          default:
            contentType = 'text/plain';
        }
      }
    }
    return contentType;
  }

  datasetControlsStatus(resultCount, datasetPageNo) {
    let prevDSPage = false;
    let nextDSPage = false;
    if (datasetPageNo <= 1) {
      prevDSPage = false;
    } else {
      prevDSPage = true;
    }

    if (resultCount >= environment.dataSetLimit) {
      nextDSPage = true;
    } else {
      nextDSPage = false;
    }

    return {
      'prevDSPage': prevDSPage,
      'nextDSPage': nextDSPage
    }

  }

  datasetCtrlOffsetString(resultCount,offsetString){
    let prevDSPage = false;
    let nextDSPage = false;
    if (offsetString === '') {
      prevDSPage = false;
    } else {
      prevDSPage = true;
    }

    if (resultCount >= environment.dataSetLimit) {
      nextDSPage = true;
    } else {
      nextDSPage = false;
    }

    return {
      'prevDSPage': prevDSPage,
      'nextDSPage': nextDSPage
    }
  }

}
