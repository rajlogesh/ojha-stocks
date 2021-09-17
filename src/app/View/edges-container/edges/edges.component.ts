import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';

@Component({
  selector: 'app-edges',
  templateUrl: './edges.component.html',
  styleUrls: ['./edges.component.scss']
})
export class EdgesComponent implements OnInit {

  edgesDataAvailable = false;
  loading = true;
  ppAvailable = false;
  npAvailable = false;
  pageNo = 0;
  pageNoOld = 0;
  breakpoint;
  pageSizeOptions = [5, 10, 20, 30, 40, 50];
  pageSize = this.pageSizeOptions[0];
  elimit;
  epage;


  displayedColumns: string[] = ['name', 'location', 'description', 'services'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private edgesFacade: EdgesFacadeService,
    private commonHelper: CommonHelperService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
      this.fetchRouteParams();
      this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  }

  fetchRouteParams() {
    this.route.queryParams
      .subscribe(params => {
        if (params.hasOwnProperty('elimit')) {
          this.elimit = params.elimit;
        } else {
          this.router.navigate(['/edges'], {queryParams: { elimit: 5, epage: 0} });
        }
        if (params.hasOwnProperty('epage')) {
          this.epage = params.epage;
        } else {
          this.router.navigate(['/edges'], {queryParams: { elimit: 5, epage: 0} });
        }
      });
      if(this.epage !== undefined && this.elimit !== undefined ){
        this.paginator.pageIndex = this.epage;
        this.pageSize = this.elimit;
      }
  }

  loadData() {
    this.loading = true;
    this.edgesFacade.getEdges(this.pageNo)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (Object.keys(response).length > 0) {
            this.edgesDataAvailable = true;
            this.applyDataSource(response);
            this.analyzeResponseForPagination(response);
          } else {
            this.pageNo = this.pageNoOld;
          }
        },
        (error) => {
          this.loading = false;
          this.edgesDataAvailable = false;
          this.pageNo = this.pageNoOld;
        }
      );
  }

  applyDataSource(response) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  analyzeResponseForPagination(response) {
    const resultCount = Object.keys(response).length;
    const pageCount = this.commonHelper.datasetControlsStatus(resultCount, this.pageNo);
    this.ppAvailable = pageCount.prevDSPage;
    this.npAvailable = pageCount.nextDSPage;
  }

  prevDS() {
    this.pageNoOld = this.pageNo;
    this.pageNo--;
    this.loadData();
  }

  nextDS() {
    this.pageNoOld = this.pageNo;444444
    this.pageNo++;
    this.loadData();
  }

  navigateDetails(row){
    this.router.navigate(
      ['/edges','detail',row.id], {
        queryParams: {
          elimit: this.elimit,
          epage: this.epage
        },
        queryParamsHandling: 'preserve'
      });
  }

  onPaginateChange(event){
    this.elimit = event.pageSize;
    this.epage = event.pageIndex;
    this.router.navigate(
      ['/edges'], {
        queryParams: {
          elimit: event.pageSize,
          epage: event.pageIndex
        },
        queryParamsHandling: 'merge'
      });
  }
  navigateSecure(){
    this.router.navigate(
      ['/edges','security'], {
        queryParams: {
          elimit: this.elimit,
          epage: this.epage
        },
        queryParamsHandling: 'preserve'
      });
  }
}
