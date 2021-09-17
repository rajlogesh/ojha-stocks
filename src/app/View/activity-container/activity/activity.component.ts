import { Component, AfterViewInit } from '@angular/core';
import { ActivityFacadeService } from 'src/app/Facades/activity-facade/activity-facade.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements AfterViewInit {

  timePeriod;
  pageSize = environment.errorMsgDly;
  pageNo = 0;
  pageNoOld = 0;
  viewMessageDetail = false;
  messageData = null;
  dataSetSize = environment.dataSetLimit;
  nextPageNotAvailable = false;
  dataSetControls = {
    prevDSPage: false,
    nextDSPage: false
  };

  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  searchTermSubject = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject.asObservable();

  messageSubject = new BehaviorSubject([]);
  message$ = this.messageSubject.asObservable();

  fileContentSubject = new BehaviorSubject({ loading: true, status: false, content: null ,viewed:false});
  fileContent$ = this.fileContentSubject.asObservable();

  dsControls = new BehaviorSubject({});
  dsControls$ = this.dsControls.asObservable();

  constructor(
    public activityFacade: ActivityFacadeService,
    private commonHelper: CommonHelperService
  ) { }

  ngAfterViewInit(): void { }

  getMessageActivity() {
    this.loadingSubject.next(true);
    this.activityFacade.getMessageActivity(this.timePeriod, this.pageSize, this.pageNo)
      .subscribe(
        (response: any[]) => {
          this.loadingSubject.next(false);
          if (Object.keys(response).length>0) {
            this.messageSubject.next(response);
            const responseLength = Object.keys(response).length;
            this.dataSetControls = this.commonHelper.datasetControlsStatus(responseLength, (this.pageNo + 1));
            this.dsControls.next(this.dataSetControls);
          } else {
            // this.showNextPageNAError();
            this.dataSetControls.nextDSPage = false;
            this.dsControls.next(this.dataSetControls);
            this.pageNo = this.pageNoOld;
            this.messageSubject.next([]);
          }
        },
        (error) => {
          this.loadingSubject.next(false);
          this.pageNo = this.pageNoOld;
          this.messageSubject.next([]);
        }
      );
  }

  private showNextPageNAError() {
    this.nextPageNotAvailable = true;
    setTimeout(() => {
      this.nextPageNotAvailable = false;
    }, environment.errorMsgDly);
  }

  durationChanged(durationSelected) {
    this.timePeriod = Number(durationSelected);
    this.getMessageActivity();
  }

  searchTerm(query) {
    this.searchTermSubject.next(query);
  }

  messageDetail(data) {
    this.viewMessageDetail = data.viewMessage;
    this.messageData = data.messageData;
  }

  viewFileContent(detail) {
    this.activityFacade.getMessageActivityContent(detail)
      .then((fileContentAsText)=>{
        this.fileContentSubject.next({ loading: false, status: true, content: fileContentAsText, viewed: true });
      })
      .catch((error)=>{
        this.fileContentSubject.next({ loading: false, status: false, content: '', viewed:true });
      });
  }

  downloadFileContent(detail) {
    this.activityFacade.downloadMessageFile(detail);
  }

  requestDS(event) {
    if (event === 'next') {
      this.pageNoOld = this.pageNo;
      this.pageNo++;
      this.getMessageActivity();
    } else if (event === 'prev' && this.pageNo > 0) {
      this.pageNoOld = this.pageNo;
      this.pageNo--;
      this.getMessageActivity();
    }
  }

}
