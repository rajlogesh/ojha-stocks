import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient,
    private httpHelper: HttpHelperService
  ) { }

  getMessageActivityByOffset(tenantId, earliestTime, latestTime, limit, offset, reverseOrder) {
    const params = new HttpParams()
      .set('tenantId', tenantId)
      .set('earliestTime', earliestTime)
      .set('latestTime', latestTime)
      .set('limit', limit)
      .set('offset', offset)
      .set('reverseOrder', reverseOrder);

    const apiUrl = this.httpHelper.apiUrl('messages/activity');
    return this.http.get(apiUrl, { params: params });
  }

  getMessageActivityContent(messageReferenceId, tenantId) {
    const params = new HttpParams()
      .set('tenantId', tenantId);

    const apiUrl = this.httpHelper.apiUrl('messages/' + messageReferenceId + '/content');
    return this.http.get(apiUrl, { params: params });
  }

  downloadMessageFile(messageReferenceId, tenantId) {
    const params = new HttpParams()
      .set('tenantId', tenantId);

    const apiUrl = this.httpHelper.apiUrl('messages/' + messageReferenceId + '/download');
    return this.http.get(apiUrl, { params: params, responseType: 'blob' });
  }

}
