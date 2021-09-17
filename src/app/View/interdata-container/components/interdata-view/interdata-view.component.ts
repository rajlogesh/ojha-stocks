import { Component, OnInit,ViewChild,Output,Input,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { environment } from 'src/environments/environment';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTableDataComponent } from '../interdata-table/remove-table-data/remove-table-data.component';


@Component({
  selector: 'app-interdata-view',
  templateUrl: './interdata-view.component.html',
  styleUrls: ['./interdata-view.component.scss']
})
export class InterdataViewComponent implements OnInit {
  loading = true;
  // interdataviewDataAvailable = false;
  id:any;
  private _viewList;

  ppAvailable = false;
  npAvailable = false;
  pageNo = 0;
  pageNoOld = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = this.pageSizeOptions[1];
  offsetString= '';
  tempOffsetString = '';
  viewListMeta: any = [];
  tempOffsetArray: Array<string> = [];
  pageLength = environment.dataSetLimit;
  // pageLength = 2;
  viewCurrentPageNo;
  viewCurrentPageSize;
  breakpoint;
  searchValue = '';



  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input()  userID: string;
  @Input('viewListFetchError') viewListFetchError = false;
  @Input('viewPageInfo') set viewPageInfo(data){
    if(data !== undefined){
      this.paginator.pageIndex = data.page;
      this.pageSize = data.limit;
      this.searchValue = data.search;
    }
  }
  @Input('viewList') set viewList(data) {
    if (data !== undefined) {
      this.viewListMeta = data;
      this.applyDataSource(data);
      this.analyzeResponseForPagination(data);
    }
    this._viewList = data;
    this.loading = false;
  }
  @Output('openViewDetail')  openViewDetail = new EventEmitter();
  @Output('fetchViewList') fetchViewListEvent = new EventEmitter();
  @Output('getViewPageInfo') getPageInfoEvent = new EventEmitter();
  @Output('deleteConfirmation') deleteConfirmationInterdata: EventEmitter<string> = new EventEmitter<string>();

  displayedColumns: string[] = ['viewName', 'description', 'createdTime', 'fieldsdetailActions', 'editActions', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    public interdatafacade: InterdataFacadeService,
    private commonHelper: CommonHelperService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    // this.interdataviewloadData();
    this.fetchViewList();
    // this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
    // this.getDisplayedColumns();
  }

  // onResize(event) {
  //   this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  //   this.getDisplayedColumns();
  // }

  // getDisplayedColumns() {
  //   this.displayedColumns = this.breakpoint === 2 ?
  //   ['viewName', 'description', 'editActions', 'actions']
  //   :
  //   ['viewName', 'description', 'createdTime', 'editActions', 'actions'];
  // }

  get viewList() {
    return this._viewList;
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
    this.router.navigate(['/interdata', 'views'], {queryParams: { limit : this.viewCurrentPageSize , page : this.viewCurrentPageNo, search: this.searchValue}, queryParamsHandling: 'merge'});
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // interdataviewloadData() {
  //   this.loading = true;
  //   this.interdatafacade.getInterdataViewList()
  //     .subscribe(
  //       (response: any)=>{
  //         this.loading = false;
  //         this.interdataviewDataAvailable = true;
  //         this.dataSource = new MatTableDataSource(response);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       },
  //       (error)=>{
  //         this.loading = false;
  //         this.interdataviewDataAvailable = false;
  //       }
  //     );
  // }
  openDeleteMembersModal(event, userId): void {
    const dialogRef = this.dialog.open(RemoveTableDataComponent, {
      width: '550px',
     });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteConfirmationInterdata.emit(userId);
      } else {
        // Do nothing.
      }
    }, (reason) => {
      // When dismissed, do nothing.
    });
  }

  fetchViewList() {
    this.loading = true;
    this.fetchViewListEvent.emit({
      'key': 'fetchViewList',
      'offsetKey': this.offsetString.toLowerCase(),
      'limit': this.pageLength,
    });
  }

  displayViewDetails(view) {
    let param = {
      view: view.viewName,
      pageNo: this.viewCurrentPageNo,
      limit: this.viewCurrentPageSize,
      searchQuery: this.searchValue
    }
    this.openViewDetail.emit(param);
  }

  onPaginateChange(event){
    this.viewCurrentPageNo = event.pageIndex;
    this.viewCurrentPageSize = event.pageSize;
    let param = {
      pageNo: this.viewCurrentPageNo,
      limit: this.viewCurrentPageSize,
      searchQuery: this.searchValue
    }
    this.getPageInfoEvent.emit(param);
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
        this.offsetString = this.tempOffsetString;
      }
    }
    this.fetchViewList();
  }

  nextDS() {
    const resultCount = Object.keys(this.viewListMeta).length;
    if(resultCount >= this.pageLength){
      this.tempOffsetString = this.offsetString;
      if(this.offsetString !== null){
        this.tempOffsetArray.push(this.offsetString);
        this.offsetString = this.viewListMeta[resultCount-1]['id']
      }
      this.fetchViewList();
    }
  }

  createNew(){
    this.router.navigate(['/interdata', 'view', 'create'], {
      queryParams: {
        limit: this.viewCurrentPageSize,
        page: this.viewCurrentPageNo,
        search: this.searchValue
      },
      queryParamsHandling: 'preserve'
    });
  }

}
