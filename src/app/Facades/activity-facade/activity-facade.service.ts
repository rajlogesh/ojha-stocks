import { Injectable } from '@angular/core';
import { ActivityBusinessService } from '../../Core/Business/Activity/activity-business.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityFacadeService {

  constructor(
    private activityBusiness: ActivityBusinessService
  ) { }

  getMessageActivity(timePeriod, pageSize, pageNo) {
    return this.activityBusiness.getMessageActivity(timePeriod, pageSize, pageNo);
  }

  getMessageActivityContent(detail) {
    return this.activityBusiness.getMessageActivityContent(detail);
  }

  downloadMessageFile(detail) {
    this.activityBusiness.downloadMessageFile(detail);
  }
  
}
