import { Component, OnInit, ViewChild, Output, Input, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTableDataComponent } from './remove-table-data/remove-table-data.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-interdata-table',
  templateUrl: './interdata-table.component.html',
  styleUrls: ['./interdata-table.component.scss']
})
export class InterdataTableComponent implements OnInit {

  loading = true;
  id: any;
  private _tableList;

  ppAvailable = false;
  npAvailable = false;
  pageNo = 0;
  pageNoOld = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = this.pageSizeOptions[0];
  offsetString= '';
  tempOffsetString = '';
  tableListMeta: any = [];
  tempOffsetArray: Array<string> = [];
  pageLength = environment.dataSetLimit;
  // pageLength = 2;
  tableCurrentPageNo;
  tableCurrentPageSize;
  searchValue = '';
  breakpoint;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input()  userID: string;
  @Input('tableListFetchError') tableListFetchError = false;
  @Input('tablePageInfo') set tablePageInfo(data){
    if(data !== undefined) {
      this.paginator.pageIndex = data.page;
      this.pageSize = data.limit;
      this.searchValue = data.search;
    }
  }
  @Input('tableList') set tableList(data) {
    if (data !== undefined) {
      this.tableListMeta = data;
      this.applyDataSource(data);
      this.analyzeResponseForPagination(data);
    }
    this._tableList = data;
    this.loading = false;
  }
  @Output('openTableDetail')  openTableDetail = new EventEmitter();
  @Output('fetchTableList') fetchTableListEvent = new EventEmitter();
  @Output('getTablePageInfo') getPageInfoEvent = new EventEmitter();
  @Output('displayTableRecord') displayTableRecordEvent = new EventEmitter();
  @Output('deleteConfirmation') deleteConfirmationInterdata: EventEmitter<string> = new EventEmitter<string>();

  displayedColumns: string[] = ['tableName', 'description', 'createdTime', 'record', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    public interdatafacade: InterdataFacadeService,
    private commonHelper: CommonHelperService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchTableList();
    this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
    this.getDisplayedColumns();

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
    this.getDisplayedColumns();
  }
  getDisplayedColumns() {
    this.displayedColumns = this.breakpoint === 2 ?
    ['tableName', 'description',  'record', 'actions']
    :
    ['tableName', 'description', 'createdTime', 'record', 'actions'];
  }
  get viewList() {
    return this._tableList;
  }

  openDeleteMembersModal(event, companyCode): void {
    const dialogRef = this.dialog.open(RemoveTableDataComponent, {
      width: '550px',
     });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        console.log(result);
        this.deleteConfirmationInterdata.emit(companyCode);
      } else {
        // Do nothing.
      }
    }, (reason) => {
      // When dismissed, do nothing.
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



  filterResults(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.router.navigate(['/interdata', 'tables'],
    {
      queryParams: {
        limit : this.tableCurrentPageSize ,
        page  : this.tableCurrentPageNo,
        search: this.searchValue
      },
      queryParamsHandling: 'merge'
    });
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchTableList() {
    this.loading = true;
    this.fetchTableListEvent.emit({
      'key': 'fetchTableList',
      'offsetKey': this.offsetString.toLowerCase(), // Table name should be passed as offset
      'limit': this.pageLength
    });
  }

  displayTableDetails(table) {
    const tempParam = {
      table: table.tableName,
      pageNo: this.tableCurrentPageNo,
      limit: this.tableCurrentPageSize,
      searchQuery: this.searchValue
    };
    this.openTableDetail.emit(tempParam);
  }



  onPaginateChange(event) {
    this.tableCurrentPageNo = event.pageIndex;
    this.tableCurrentPageSize = event.pageSize;
    const param = {
      pageNo: this.tableCurrentPageNo,
      limit: this.tableCurrentPageSize,
      searchQuery: this.searchValue
    };
    this.getPageInfoEvent.emit(param);
  }

  prevDS() {
    if (this.tempOffsetArray.indexOf(this.tempOffsetString) !== -1){
      const index = this.tempOffsetArray.indexOf(this.tempOffsetString);
      this.offsetString = this.tempOffsetString;
      if (this.tempOffsetArray[index - 1] !== undefined) {
        this.tempOffsetString = this.tempOffsetArray[index - 1];
        this.tempOffsetArray.splice(index, this.tempOffsetArray.length - index);
      }  else {
        // this.tempOffsetString = '';
        this.offsetString = this.tempOffsetString;
      }
    }
    this.fetchTableList();
  }

  nextDS() {
    const resultCount = Object.keys(this.tableListMeta).length;
    if(resultCount >= this.pageLength){
      this.tempOffsetString = this.offsetString;
      if(this.offsetString !== null){
        this.tempOffsetArray.push(this.offsetString);
        this.offsetString = this.tableListMeta[resultCount-1]['id']
      }
      this.fetchTableList();
    }
  }

  deleteConfirmation(a) {
    console.log('name' + a );
  }

  displayTableRecords(record) {
    this.displayTableRecordEvent.emit(record);
  }

  createNew() {
    this.router.navigate(['/interdata', 'table', 'create'], {
      queryParams: {
        limit: this.tableCurrentPageSize,
        page: this.tableCurrentPageNo,
        search: this.searchValue
      },
      queryParamsHandling: 'preserve'
    });
  }
}
