import { Injectable } from '@angular/core';
import { ActivityService } from 'src/app/Core/Services/activity-service/activity.service';
import { CommonHelperService } from '../../Helpers/common-helper/common-helper.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityBusinessService {

  constructor(
    private activityService: ActivityService,
    private commonHelper: CommonHelperService
  ) { }

  getMessageActivity(timePeriod, pageSize, pageNo) {
    const tPDT = this.commonHelper.converTimeperiodIntoDatetime(timePeriod);
    const tenantId = this.commonHelper.getTenantId();
    pageNo = this.commonHelper.calculatePageNo(pageNo, pageSize);
    return this.activityService.getMessageActivityByOffset(tenantId, tPDT.earliestTime, tPDT.latestTime, pageSize, pageNo, true);
  }

  getMessageActivityContent(detail) {
    return new Promise((resolve, reject) => {
      const messageReferenceId = detail.messageReferenceId;
      const tenanatId = this.commonHelper.getTenantId();
      this.activityService.getMessageActivityContent(messageReferenceId, tenanatId)
        .subscribe(
          (fileContent)=>{
            const fileContentType = this.commonHelper.getFileContentType(detail);
            if (
              fileContentType === 'text/plain' ||
              fileContentType === 'text/csv' ||
              fileContentType === 'application/json'
            ) {
              this.getFileContentAsText(fileContent, fileContentType)
                .then((fileContentAsText) => {
                  resolve(fileContentAsText);
                })
                .catch((error)=>{
                  reject(false);
                });
            } else {
              reject(false);
            }
          },
          (error)=>{
            reject(false);
          }
        );
    });
  }

  private getFileContentAsText(fileContent, fileContentType) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([fileContent], { type: fileContentType });
      const fileReader = new FileReader();
      fileReader.readAsText(blob, 'UTF-8');
      fileReader.onloadend = (event) => {
        let result = fileReader.result.toString();
        // Replace closing brackets and comma with line breaks.
        result = result.replace(new RegExp('},', 'g'), '},\n');
        // Replace double quotes with blank space.
        result = result.replace(new RegExp('"', 'g'), '');
        resolve(result);
      };
      fileReader.onerror = (error) => {
        reject(false);
      };
      fileReader.onabort = (error) => {
        reject(false);
      };
    });
  }

  downloadMessageFile(detail) {
    const messageReferenceId = detail.messageReferenceId;
    const tenanatId = this.commonHelper.getTenantId();
    this.activityService.downloadMessageFile(messageReferenceId, tenanatId)
      .subscribe(
        (response)=>{
          this.saveFile(response, detail.fileContentType, (detail.fileName || detail.label));
        },
        (error)=>{
          console.error(error);
        }
      );
  }

  saveFile(data, fileContentType, fileName) {
    const blob = new Blob([data], { type: fileContentType });
    const url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
  }

}
