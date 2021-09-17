import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import {  Location} from '@angular/common';


@Component({
  selector: 'app-log-content',
  templateUrl: './log-content.component.html',
  styleUrls: ['./log-content.component.scss']
})
export class LogContentComponent implements OnInit {

  edgeId;
  edgeServiceId;
  logId;
  logInfo;
  logContent;
  loading = false;
  userFeedback = 'none';
  breakpoint;
  rowHeight;

  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(
    private router: Router,
    public location: Location,
    private route: ActivatedRoute,
    private edgesFacade: EdgesFacadeService,
  ) {
    this.fetchRouteParams();
    this.fetchLogContent();
   }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    // this.rowHeight = (window.innerWidth <= 600) ? "50px" : "60px";
  }

  fetchRouteParams(){
    this.route.params.subscribe((params) => {
      this.edgeServiceId = params.eslog || '';
      this.logId = params.logid || '';
      this.edgeId = params.id || '';
    });
  }

  fetchLogContent(){
    this.loading = true;
    let request = {
      id: this.logId,
      edgeServiceId: this.edgeServiceId
    }
    this.edgesFacade.getLogContent(request)
      .subscribe(
        (response) => {
          this.loading = false;
          this.userFeedback = "none";
          this.logInfo = response;
          this.logContent = atob(response['logData']);
        },
        (error) => {
          this.loading = false;
          this.userFeedback = "logErr";
        });
  }

  onDownloadLog(){
    let params = {
      edgeServiceId:this.edgeServiceId,
      logId:  this.logId,
      fileName: this.logInfo.fileName,
      contentType: this.logInfo.contentType
    }
    this.edgesFacade.downloadLogFile(params);
  }

  backToServices(){
    this.router.navigate(
      ['/edges/service',this.edgeId], {
        queryParams: {
          elimit: '',
          epage: '',
          loglimit: '',
          logpage: ''
        },
        queryParamsHandling: 'preserve'
      });
  }

  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    // this.rowHeight = (window.innerWidth <= 600) ? "50px" : "60px" ;
  }

}
