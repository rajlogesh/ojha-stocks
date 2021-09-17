import { Component, OnInit} from '@angular/core';
import { Router,  ActivatedRoute,  Params} from '@angular/router';
import { environment} from 'src/environments/environment';
import { InterdataFacadeService} from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-interdata',
  templateUrl: './interdata.component.html',
  styleUrls: ['./interdata.component.scss']
})
export class InterdataComponent implements OnInit {

  tab = -1;
  tabCheck;
  viewList;
  viewPageInfo = {
    limit: '',
    page: '',
    search: ''
  };
  viewListFetchError = false;

  tableList;
  tablePageInfo = {
    limit: '',
    page: '',
    search: ''
  };
  tableRequestData;
  viewRequestData;
  tableListFetchError = false;
  private DeleteUserStatus = new BehaviorSubject('initial');

  constructor(
    private router: Router,
    private interdatafacade: InterdataFacadeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.tabCheck = params.id;
      });
    this.fetchQueryParams(this.tabCheck);
  }

  fetchQueryParams(tab) {
    switch (tab) {
      case 'views':
        this.route.queryParams
          .subscribe(params => {
            if (params.hasOwnProperty('limit')) {
              this.viewPageInfo.limit = params.limit;
            }
            if (params.hasOwnProperty('page')) {
              this.viewPageInfo.page = params.page;
            }
            if (params.hasOwnProperty('search')) {
              this.viewPageInfo.search = params.search;
            }
          });
        break;
      case 'tables':
        this.route.queryParams
          .subscribe(params => {
            if (params.hasOwnProperty('limit')) {
              this.tablePageInfo.limit = params.limit;
            }
            if (params.hasOwnProperty('page')) {
              this.tablePageInfo.page = params.page;
            }
            if (params.hasOwnProperty('search')) {
              this.tablePageInfo.search = params.search;
            }
          });
        break;
      default:
        break;
    }
  }

  setTabValue(index) {
    this.tab = index;
    switch (this.tab) {
      case 0:
        this.router.navigate(['/interdata/views'], {
          queryParams: {
            limit: this.viewPageInfo.limit,
            page: this.viewPageInfo.page,
            search: this.viewPageInfo.search
          },
          queryParamsHandling: 'merge'
        });
        break;
      case 1:
        this.router.navigate(['/interdata/tables'], {
          queryParams: {
            limit: this.tablePageInfo.limit,
            page: this.tablePageInfo.page,
            search: this.tablePageInfo.search
          },
          queryParamsHandling: 'merge'
        });
        break;
    }
  }

  getTabValue() {
    if (this.tab === -1) {

      switch (this.tabCheck) {
        case 'views':
          return this.tab = 0;
        case 'tables':
          return this.tab = 1;
        default:
          break;
      }
    } else {
      return this.tab;
    }
  }

  openViewDetail(event) {
    this.interdatafacade.navigateInterdataViewDetail(event);
  }

  fetchViewList(request) {
    this.viewRequestData = request;
    this.interdatafacade.getInterdataViewList(request.offsetKey, request.limit).subscribe((response: Array < any > ) => {
        this.viewList = response;
      },
      (error) => {
        this.viewListFetchError = true;
        this.viewList = false;
        setTimeout(() => {
          this.viewListFetchError = false;
        }, environment.errorMsgDly);
      });
  }

  openTableDetail(event) {
    this.interdatafacade.navigateInterdataTableDetail(event);
  }

  fetchTableList(request) {
    this.tableRequestData = request;
    this.interdatafacade.getInterdataTableList(request.offsetKey, request.limit).subscribe((response: any) => {
        this.tableList = response.companyDetails;
        console.log("*************");
        console.log(response);
      },
      (error) => {
        this.tableListFetchError = true;
        this.tableList = false;
        setTimeout(() => {
          this.tableListFetchError = false;
        }, environment.errorMsgDly);
      });
  }


  getViewPageInfo(event) {
    this.router.navigate(
      ['/interdata', 'views'], {
        queryParams: {
          limit: event.limit,
          page: event.pageNo,
          search: event.searchQuery
        },
        queryParamsHandling: 'merge'
      });
  }

  getTablePageInfo(event) {
    this.router.navigate(
      ['/interdata', 'tables'], {
        queryParams: {
          limit: event.limit,
          page: event.pageNo,
          search: event.searchQuery
        },
        queryParamsHandling: 'merge'
      });
  }


  displayTableRecord(event) {
    this.interdatafacade.navigateTableRecord(event);
  }

  deleteConfirmation(e) {
    this.interdatafacade.deleteTableData(e).subscribe(
      (response) => {
        this.DeleteUserStatus.next('deletesuccess');
        setTimeout(() => {
          this.DeleteUserStatus.next('initial');
        }, environment.errorMsgDly);
        this.fetchTableList(this.tableRequestData);
      },
      (error) => {
        this.DeleteUserStatus.next('deletefailed');
        setTimeout(() => {
          this.DeleteUserStatus.next('initial');
        }, environment.errorMsgDly);
      }
    );
  }
  deleteViewConfirmation(e) {
    this.interdatafacade.deleteViewData(e).subscribe(
      (response) => {
        this.DeleteUserStatus.next('deletesuccess');
        setTimeout(() => {
          this.DeleteUserStatus.next('initial');
        }, environment.errorMsgDly);
        this.fetchViewList(this.viewRequestData);
      },
      (error) => {
        this.DeleteUserStatus.next('deletefailed');
        setTimeout(() => {
          this.DeleteUserStatus.next('initial');
        }, environment.errorMsgDly);
      }
    );
  }
}
