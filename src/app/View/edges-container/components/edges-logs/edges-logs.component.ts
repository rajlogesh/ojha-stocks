import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {  Location} from '@angular/common';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';



@Component({
  selector: 'app-edges-logs',
  templateUrl: './edges-logs.component.html',
  styleUrls: ['./edges-logs.component.scss']
})

export class EdgesLogsComponent implements OnInit {

  loading = true;
  edgeServiceId;
  edgeId;
  eLimit;
  ePage;
  logLimit;
  logPage;
  userFeedback = 'none';

  ppAvailable = false;
  npAvailable = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = this.pageSizeOptions[0];
  offsetString= '';
  tempOffsetString = '';
  edgeLogMeta: any = [];
  tempOffsetArray: Array<string> = [];
  pageLength = environment.dataSetLimit;
  // pageLength = 2;

  displayedColumns: string[] = ['fileName','contentType','timestamp'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private edgesFacade: EdgesFacadeService,
    private commonHelper: CommonHelperService
  ) {
  }

  ngOnInit(): void {
    this.fetchRouteParams();
    this.fetchLogList();
  }

  fetchRouteParams(){
    this.route.params.subscribe((params) => {
      this.edgeServiceId = params.eslog || '';
      this.edgeId = params.id || '';
    });
    this.route.queryParams
      .subscribe(params => {
        if (params.hasOwnProperty('elimit')) {
          this.eLimit = params.elimit || '';
        }
        if (params.hasOwnProperty('epage')) {
          this.ePage = params.epage || '';
        }
        if (params.hasOwnProperty('loglimit')) {
          this.logLimit = params.loglimit || '';
        }else{
          this.router.navigate(['/edges','service',this.edgeId,this.edgeServiceId], {queryParams: { elimit: this.eLimit, epage: this.ePage,loglimit: 5, logpage:0} });
        }
        if (params.hasOwnProperty('logpage')) {
          this.logPage = params.logpage || '';
        }else{
          this.router.navigate(['/edges','service',this.edgeId,this.edgeServiceId], {queryParams: { elimit: this.eLimit, epage: this.ePage,loglimit: 5, logpage:0} });
        }
      });
      if(this.logPage !== undefined && this.logLimit !== undefined){
        this.paginator.pageIndex = this.logPage;
        this.pageSize = this.logLimit;
      }
  }


  fetchLogList(){
    this.loading = true;
    let request = {
      id : this.edgeServiceId,
      offset : this.offsetString,
      limit : this.pageLength
    }
    this.edgesFacade.getLog(request)
      .subscribe(
        (response: Array<any>) => {
          if(response.length > 0 && response.length !== null){
            this.loading = false;
            this.userFeedback="none";
            this.edgeLogMeta = response;
            this.applyDataSource(response);
            this.analyzeResponseForPagination(response);
          }
          else{
            this.loading = false;
            this.userFeedback = "logNF";
            this.npAvailable = false;
          }
        },
        (error) => {
          this.loading = false;
          this.userFeedback = "logErr";
        });
  }

  applyDataSource(response) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  analyzeResponseForPagination(response) {
    const resultCount = Object.keys(response).length;
    const pageCount = this.commonHelper.datasetCtrlOffsetString(resultCount,this.offsetString);
    this.ppAvailable = pageCount.prevDSPage;
    this.npAvailable = pageCount.nextDSPage;
  }

  onPaginateChange(event) {
    this.logPage = event.pageIndex;
    this.logLimit = event.pageSize;
    this.router.navigate(
      ['/edges','service',this.edgeId,this.edgeServiceId], {
        queryParams: {
          loglimit: event.pageSize,
          logpage: event.pageIndex,
          elimit: this.eLimit,
          epage: this.ePage
        },
        queryParamsHandling: 'merge'
      });

  }


  prevDS() {
    if(this.tempOffsetArray.indexOf(this.tempOffsetString) !== -1){
      const index = this.tempOffsetArray.indexOf(this.tempOffsetString);
      this.offsetString = this.tempOffsetString;
      if(this.tempOffsetArray[index-1] !== undefined){
        this.tempOffsetString = this.tempOffsetArray[index-1];
        this.tempOffsetArray.splice(index,this.tempOffsetArray.length - index);
      }
      else{
        // this.tempOffsetString = '';
        this.offsetString = this.tempOffsetString;
      }
    }
    this.fetchLogList();
  }

  nextDS() {
    const resultCount = Object.keys(this.edgeLogMeta).length;
    if(resultCount >= this.pageLength){
      this.tempOffsetString = this.offsetString;
      if(this.offsetString !== null){
        this.tempOffsetArray.push(this.offsetString);
        this.offsetString = this.edgeLogMeta[resultCount-1]['id']
      }
      this.fetchLogList();
    }
  }

  viewLogContent(data){
    this.router.navigate(['/edges','service',this.edgeId ,data.edgeServiceId,data.id], {
      queryParams: {
        elimit: this.eLimit,
        epage: this.ePage,
        loglimit: this.logLimit,
        logpage: this.logPage
      },
      queryParamsHandling: 'merge'
    });
  }

  backToEdge(){
    this.router.navigate(
      ['/edges'], {
        queryParams: {
          elimit: this.eLimit,
          epage: this.ePage,
          loglimit: 5,
          logpage: 0
        },
        queryParamsHandling: 'preserve'
      });
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
}
