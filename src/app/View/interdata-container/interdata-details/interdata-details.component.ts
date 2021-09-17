import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { TableSelectionModalComponent } from '../components/table-selection-modal/table-selection-modal.component';
import { Location } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-interdata-details',
  templateUrl: './interdata-details.component.html',
  styleUrls: ['./interdata-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])]
})
export class InterdataDetailsComponent implements OnInit {

  viewName: string;
  partitionKeyName            = '';
  partitionKey                = '';
  currentPartitionKey         = '';
  continuationToken           = '';
  breakpoint;
  expandedElement;
  userFeedback                = 'none';
  loading                     = true;
  typedSearch                 = false;
  pageSizeOptions             = [10, 20, 30, 40];
  limit: number               = this.pageSizeOptions[0];
  nextPageToken               = '';
  previousPageToken           = false;
  previousPageTokenList       = [];
  interdataResponse           = [];
  interdataMetadata: any[]    = [];
  inputs: any                 = { viewName: '', partitionKey: '', limit: '', continuationToken: '' };
  inputsSubject               = new BehaviorSubject(this.inputs);
  inputs$                     = this.inputsSubject.asObservable();
  DisplayedColumns: string[]  = [];
  dataSource: any             = new MatTableDataSource();
  interdataviewParam          = {offsetKey: '' , limit: 100 }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private DeleteUserStatus = new BehaviorSubject('initial');
  constructor(
    private route: ActivatedRoute,
    private interdatafacade: InterdataFacadeService,
    private dialog: MatDialog,
    public location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInterdataList();
    this.listenInterdataRequest();
    this.fetchRouteParams();
    // this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
  }

  // onResize(event) {
  //   this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  // }

  onLimitChange(e) {
    if (e.value) {
      this.limit = e.value;
    }
    this.inputsSubject.next({ 'viewName': this.viewName, 'partitionKey': this.partitionKey, 'limit': this.limit });
  }

  displayTableList(column, row) {
    const modalRef = this.dialog.open(TableSelectionModalComponent, {
      width: '400px'
    });
    modalRef.componentInstance.key = column;
    modalRef.componentInstance.tableList = this.interdataMetadata;
    modalRef.afterClosed().subscribe((res) => {
      if (res !== '' && res !== undefined && res !== null) {
        this.router.navigate(['/interdata', 'views', res.trim()], { queryParams: { key: column } });
      }
    });
  }

  searchChanged(event) {
    this.typedSearch          = true;
    this.partitionKey         = event;
    this.currentPartitionKey  = this.partitionKey;
    this.inputsSubject.next({ 'viewName': this.viewName, 'partitionKey': this.partitionKey, 'limit': this.limit, 'continuationToken': '' });
  }

  previous() {
    this.previousPageTokenList.pop();
    this.inputsSubject.next({
      'partitionKey': this.partitionKey,
      'limit': this.limit,
      'continuationToken': this.previousPageTokenList[this.previousPageTokenList.length - 1]
    });
    if (this.previousPageTokenList.length <= 1) {
      this.previousPageToken = false;
      if (this.previousPageTokenList.length === 0) {
        this.previousPageTokenList.push('');
      }
    }
  }

  next() {
    this.previousPageToken = true;
    this.previousPageTokenList.push(this.nextPageToken);
    this.inputsSubject.next({
      'partitionKey': this.partitionKey,
      'limit': this.limit,
      'continuationToken': this.nextPageToken
    });
  }
  deleteConfirmation(e) {
    this.interdatafacade.deleteTableData(e).subscribe(
     (response) => {
       this.DeleteUserStatus.next('deletesuccess');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
      //  this.fetchTableList(this.tableRequestData);
     },
     (error) => {
       this.DeleteUserStatus.next('deletefailed');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
     }
    );
  }
  /**
   * Private Functions
   */

  private fetchRouteParams() {
    this.route.params.subscribe((params)=>{
      this.viewName = params.viewName || '';
      if (params.viewName !== undefined && params.viewName !== null && params.viewName !== '') {
        this.inputsSubject.next({ 'viewName': this.viewName, 'partitionKey': this.partitionKey });
      }
    });
    this.route.queryParams.subscribe((query) => {
      this.partitionKey = query.key || '';
      this.currentPartitionKey = this.partitionKey;
      if (this.typedSearch === false) {
        this.inputsSubject.next({
          'viewName': this.viewName,
          'partitionKey': this.partitionKey,
          'limit': this.limit,
          'continuationToken': ''
        });
      }
    });
  }

  private listenInterdataRequest() {
    this.inputs$
      .pipe(
        debounceTime(750),
        distinctUntilChanged((p, q) => p.partitionKey === q.partitionKey &&
                              p.limit === q.limit && p.continuationToken === q.continuationToken)
      )
      .subscribe((input) => {
        this.currentPartitionKey = input.partitionKey;
        this.updateRoutePath();
        this.fetchInterdataDetails(this.viewName, this.partitionKey, this.limit, this.continuationToken);
      });
  }

  private fetchInterdataDetails(viewName, partitionKey, limit, continuationToken) {
    this.loading = true;
    this.userFeedback = 'none';
    this.interdatafacade.getinterdataDetail(viewName, partitionKey, limit, continuationToken)
      .subscribe(
        (response) => {
          this.loading = false;
          this.configureTablePA(response);
        },
        (error) => {
          this.loading = false;
          this.reportError('InterdataFetchFailed');
        }
      );
  }

  private configureTablePA(response) {
    if (!response || !response.result || response.result.length < 1) {
      this.DisplayedColumns = [];
      this.interdataResponse = [];
      this.dataSource = new MatTableDataSource([]);
      this.reportError('InterdataResultNA', false);
    } else {
      response.result.forEach(row => delete row['odata.etag']);
      let result = this.formattedResult(response.result);

      this.DisplayedColumns   = this.getDisplayedColumns(response.result);
      this.interdataResponse  = this.formattedResult(response.result);
      this.continuationToken = response.continuationToken;
      this.nextPageToken = response.continuationToken;
      this.dataSource = new MatTableDataSource(response.result);
      this.dataSource.sort = this.sort;
      // debugger;
    }
  }
  private formattedResult(res) {
    if (res.length > 0) {
      let formattedResult = [];
      res.forEach(res => {
        const checkres = {
          properties: []
        };
      });
      let keys = Object.keys(res);
      let temp = []
      Object.keys(res).reduce((result, key) => {
        temp = (Object.keys(res[key]));
        const currentProps = res[key];
        const unSliced = Object.keys(currentProps).slice(0 , 3).reduce((result, key) => {
          result[key] = currentProps[key];
          return result;
        }, {});
        const sliced = Object.keys(currentProps).slice(3).reduce((result, key) => {
          result[key] = currentProps[key];
          return result;
        }, {});
        const finSliced = [];
        Object.keys(sliced).map((key, index) => {
          finSliced.push([key , sliced[key]]);
        });
        formattedResult.push(result);
        return {...unSliced, properties: finSliced};
        }, {});
      console.log(formattedResult);
      return formattedResult;
    }
  }

  private reportError(msg: string, reset?: boolean) {
    this.userFeedback = msg;
    if (reset !== false) {
      setTimeout(() => {
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  private getInterdataList() {
    this.interdatafacade.getInterdataViewList(this.interdataviewParam.offsetKey,this.interdataviewParam.limit)
    .subscribe((res: any[]) => {
      this.interdataMetadata = res;
      this.partitionKeyName = this.interdataMetadata.find(view => view.viewName === this.viewName).partitionKeyName;
    });
  }

  private updateRoutePath() {
    if (this.typedSearch === true) {
      this.router.navigate(['/interdata', 'views', this.viewName], { queryParams: { key: this.currentPartitionKey } });
      this.typedSearch = false;
    }
  }

  private getDisplayedColumns(response: any[]) {
    let temp = [];
    if (response.length > 0) {
      response.forEach(res => {
        const keys = Object.keys(response[0]);
        let result = keys;
        // let result = keys.slice(0 , 3);
        const col = result;
        if (temp.length !== col.length) {
          temp = temp.concat(col);
        }
      });
      const uniq = temp.filter((item, index) => temp.indexOf(item) === index);
      // console.log(uniq);
      return uniq;
    }
  }
}
