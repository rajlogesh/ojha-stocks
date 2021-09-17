import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { MatSort} from '@angular/material/sort';
import {  MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { InterdataFacadeService} from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { environment} from 'src/environments/environment';
import { MatDialog} from '@angular/material/dialog';
import { Location} from '@angular/common';
import { RemoveTableDataComponent } from '../interdata-table/remove-table-data/remove-table-data.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableRecordComponent implements OnInit {

  tableName: string;
  partitionKeyName = '';
  partitionKey = '';
  rowKey = '';
  currentPartitionKey = '';
  currentRowKey = '';
  continuationToken = '';
  userFeedback = 'none';
  loading = true;
  typedSearch = false;
  pageSizeOptions = [10, 20, 30, 40];
  limit: number = this.pageSizeOptions[0];
  nextPageToken: string = '';
  previousPageToken = false;
  previousPageTokenList = [];
  interdataResponse = [];
  interdataMetadata: any[] = [];
  showDelete = false;
  inputs: any = {
    tableName: '',
    partitionKey: '',
    rowKey: '',
    limit: '',
    continuationToken: ''
  };
  breakpoint;
  selectedType = '';
  inputsSubject = new BehaviorSubject(this.inputs);
  inputsSearchRowId = new BehaviorSubject(this.inputs);
  inputs$ = this.inputsSubject.asObservable();
  inputsRowId$ = this.inputsSearchRowId.asObservable();
  DisplayedColumns: string[] = [];
  expandedElement;
  dataSource: any = new MatTableDataSource();
  interdataviewParam = {
    offsetKey: '',
    limit: environment.dataSetLimit
  };
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;


  constructor(
    private route: ActivatedRoute,
    private interdatafacade: InterdataFacadeService,
    private dialog: MatDialog,
    public location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getInterdataList();
    this.listenInterdataRequest();
    this.listenInterdataRowIdRequest();
    this.fetchRouteParams();
    this.handleDeleteButton();
    this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
}
  handleDeleteButton() {
    if (this.partitionKey !== '' && this.rowKey.length < 1) {
      this.selectedType = 'Selected Partition';
      this.showDelete = true;
    } else if (this.partitionKey !== '' && this.rowKey !== '') {
      this.selectedType = 'Selected RowId';
      this.showDelete = true;
    } else {
      this.selectedType = '';
      this.showDelete = false;
    }
  }

  displayTableDetails(table) {
    // console.log(table);
    let param = {
      tableName: this.tableName,
      partitionKey: table.partitionKey,
      rowKey: table.rowKey,
    };
    this.openTableDetail(param);
  }

  openTableDetail(event) {
    // conso
    this.interdatafacade.navigateInterdataUpdateTableRecord(event);
  }

  onLimitChange(e) {
    if (e.value) {
      this.limit = e.value;
    }
    this.inputsSubject.next({
      'tableName': this.tableName,
      'partitionKey': this.partitionKey,
      'rowKey': this.rowKey,
      'limit': this.limit
    });
  }

  searchRowKey(event) {
    this.typedSearch = true;
    this.rowKey = event;
    this.currentRowKey = this.rowKey;

  }
  searchChanged() {
    this.typedSearch = true;
    this.currentRowKey = this.rowKey;
    this.currentPartitionKey = this.partitionKey;
    this.handleDeleteButton();
    if (this.rowKey !== '') {
      this.inputsSearchRowId.next({
      'tableName': this.tableName,
      'partitionKey': this.partitionKey,
      'rowKey': this.rowKey,
      'limit': this.limit,
      'continuationToken': ''
    });
    } else if (this.rowKey === '' && this.partitionKey !== '') {
      // this.currentRowKey = input.rowKey;
      this.updateRoutePath();
      this.fetchInterdataDetails(this.tableName, this.partitionKey, this.rowKey, this.limit, this.continuationToken);
    }
    else {
    this.inputsSubject.next({
      'tableName': this.tableName,
      'partitionKey': this.partitionKey,
      'rowKey': this.rowKey,
      'limit': this.limit,
      'continuationToken': ''
    });
  }
  }
  previous() {
    this.previousPageTokenList.pop();
    this.inputsSubject.next({
      'partitionKey': this.partitionKey,
      'rowKey': this.rowKey,
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
      'rowKey': this.rowKey,
      'limit': this.limit,
      'continuationToken': this.nextPageToken
    });
  }
  openDeleteMembersModal(): void {
    // console.log(e, id);
    const dialogRef = this.dialog.open(RemoveTableDataComponent, {
      width: '550px',
     });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deletePartition();
      }
    });
  }
  deletePartition() {
    if (this.partitionKey !== '' && this.rowKey.length < 1) {
      this.interdatafacade.deleteTablePartition(this.tableName, this.partitionKey)
      .subscribe(
        (response) => {
          this.userFeedback = 'success';
          setTimeout(() => {
            this.userFeedback = 'none';
          }, environment.errorMsgDly);
        },
        (error) => {
          this.userFeedback = 'failure';
          setTimeout(() => { this.userFeedback = 'none'; }, environment.errorMsgDly);
        }
      );
    } else {
      this.interdatafacade.deleteTableRow(this.tableName, this.partitionKey,this.rowKey)
      .subscribe(
        (response) => {
          this.userFeedback = 'success';
          setTimeout(() => {
            this.userFeedback = 'none';
          }, environment.errorMsgDly);
        },
        (error) => {
          this.userFeedback = 'failure';
          setTimeout(() => { this.userFeedback = 'none'; }, environment.errorMsgDly);
        }
      );
    }
  }

  createNew() {
    this.router.navigate(['/interdata', 'tables', this.tableName, 'records', 'create']);
  }

  /**
   * Private Functions
   */

  private fetchRouteParams() {
    this.route.params.subscribe((params) => {
      this.tableName = params.tableName || '';
      if (params.tableName !== undefined && params.tableName !== null && params.tableName !== '') {
        this.inputsSubject.next({
          'tableName': this.tableName,
          'partitionKey': this.partitionKey,
          'rowKey': this.rowKey
        });
      }
    });
    this.route.queryParams.subscribe((query) => {
      this.partitionKey = query.key || '';
      this.rowKey = query.rowId || '';

      this.currentPartitionKey = this.partitionKey;
      this.inputsSubject.next({
        'tableName': this.tableName,
        'partitionKey': this.partitionKey,
        'rowKey': this.rowKey,
        'limit': this.limit,
        'continuationToken': ''
      });
    });
  }

  private listenInterdataRequest() {
    this.inputs$
      .pipe(
        debounceTime(750),
        distinctUntilChanged((p, q) =>  p.partitionKey === q.partitionKey &&
                                        p.limit === q.limit && p.continuationToken === q.continuationToken)
      )
      .subscribe((input) => {
        this.currentPartitionKey = input.partitionKey;
        this.updateRoutePath();
        this.fetchInterdataDetails(this.tableName, this.partitionKey, this.rowKey, this.limit, this.continuationToken);
      });
  }

  private listenInterdataRowIdRequest() {
    this.inputsRowId$
    .pipe(
      debounceTime(750),
      distinctUntilChanged((p, q) => p.partitionKey === q.partitionKey &&
                                     p.rowKey === q.rowKey && p.limit === q.limit && p.continuationToken === q.continuationToken)
    )
    .subscribe((input) => {
      this.currentRowKey = input.rowKey;
      this.updateRoutePath();
      this.fetchInterdataDetails(this.tableName, this.partitionKey, this.rowKey, this.limit, this.continuationToken);
    });
  }
  private fetchInterdataDetails(tableName, partitionKey, rowKey, limit, continuationToken) {
    this.loading = true;
    this.userFeedback = 'none';
    if (partitionKey !== '' && this.rowKey.length < 1) {
      this.interdatafacade.getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken)
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
    } else if (partitionKey !== '' && this.rowKey !== '') {
      this.interdatafacade.getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken)
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
    } else {
      this.interdatafacade.getInterdataTableRecord(tableName, limit, continuationToken)
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
  }

  private configureTablePA(response) {
    if (!response ) {
      this.DisplayedColumns = [];
      this.interdataResponse = [];
      this.dataSource = new MatTableDataSource([]);
      this.reportError('InterdataResultNA', false);
    } else {
      // console.log(this.partitionKey);
      if (this.partitionKey !== '') {
        if (response.length !== undefined) {
          this.DisplayedColumns = this.getDisplayedColumns(response);
          this.interdataResponse = this.getFormattedResponse(response);
          this.dataSource = new MatTableDataSource(response);
        } else {
          this.DisplayedColumns = this.getDisplayedColumns([response]);
          this.interdataResponse = this.getFormattedResponse([response]);
          this.dataSource = new MatTableDataSource([response]);
        }
        this.continuationToken = response.continuationToken;
        this.nextPageToken = response.continuationToken;
        this.dataSource.sort = this.sort;
      } else {
        this.DisplayedColumns = this.getDisplayedColumns(response.result);
        this.interdataResponse = this.getFormattedResponse(response.result);
        this.continuationToken = response.continuationToken;
        this.nextPageToken = response.continuationToken;
        this.dataSource = new MatTableDataSource(response.result);
        this.dataSource.sort = this.sort;
      }
    }
  }

  private reportError(msg: string, reset ? : boolean) {
    this.userFeedback = msg;
    // if (reset !== false) {
    //   setTimeout(() => {
    //     this.userFeedback = 'none';
    //   }, environment.errorMsgDly);
    // }
  }

  // private getInterdataList() {
  //   this.interdatafacade.getInterdataViewList(this.interdataviewParam.offsetKey, this.interdataviewParam.limit)
  //     .subscribe((res: any[]) => {
  //       this.interdataMetadata = res;
  //       this.partitionKeyName = this.interdataMetadata.find(view => view.tableName === this.tableName).partitionKeyName;
  //     });
  // }

  private updateRoutePath() {
    if (this.typedSearch === true) {
      this.router.navigate(['/interdata', 'tables', this.tableName , 'records'], {
        queryParams: {
          key: this.currentPartitionKey,
          rowId: this.currentRowKey
        }
      });
      this.typedSearch = false;
    }
  }

  private getDisplayedColumns(response: any[]) {
    let temp = [];
    if (response.length > 0) {
      response.forEach(res => {
        const keys = Object.keys(res);
        const props = Object.keys(res['properties']);
        keys.pop();
        keys.pop();
        const col = keys;
        if (temp.length !== col.length) {
          temp = temp.concat(col);
        }
      });
      const uniq = temp.filter((item, index) => temp.indexOf(item) === index);

      return uniq;
      // return keys;
    }
  }

  private getFormattedResponse(response) {
    if (response.length > 0) {
      response.forEach(res => {
        const checkres = {
          properties: []
        };
        Object.keys(res.properties).map((key, index) => {
          checkres.properties.push([key , res.properties[key]]);
        });
        delete res.properties;
        delete res.timestamp;
        Object.assign(res, checkres);
      });
      // console.log(response);
      return response;
    }
  }
}
