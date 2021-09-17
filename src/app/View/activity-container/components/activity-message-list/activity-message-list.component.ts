import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity-message-list',
  templateUrl: './activity-message-list.component.html',
  styleUrls: ['./activity-message-list.component.scss']
})
export class ActivityMessageListComponent implements OnInit, OnChanges {

  @Input('detail') detail;
  @Input('fileContent$') fileContent$ = new Observable();
  @Output('viewFileContent') viewFileContentEvent = new EventEmitter();
  @Output('downloadFileContent') downloadFileContentEvent = new EventEmitter();
  @Output('backToResult') backToResultEvent = new EventEmitter();

  fileViewed = false;
  fileLoading = false;
  fileStatus = true;
  fileContent;
  breakpoint;
  rowHeight;

  constructor() { }

  ngOnInit(): void {
    this.fileLoading = false;
    this.fileViewed = false;
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.rowHeight = (window.innerWidth <= 800) ? "9:1" : "6:1";
  }
  ngOnChanges() {
    this.fileLoading  = true;
    this.fileStatus   = false;
    this.fileContent  = '';
    this.fileViewed = true;
  }

  // onResize(event) {
  //   this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  // }

  onViewContent(){
    this.viewFileContentEvent.emit(this.detail);
    this.fileContent$.subscribe((res: any) => {
      this.fileLoading  = res.loading;
      this.fileStatus   = res.status;
      this.fileContent  = res.content;
      this.fileViewed = res.viewed;
    });
  }

  backToResults() {
    this.backToResultEvent.emit({ viewMessage: false, messageData: null });
  }

  doFileDownload() {
    this.downloadFileContentEvent.emit(this.detail);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
    this.rowHeight = (event.target.innerWidth <= 800) ? "9:1" : "6:1";
  }
}
