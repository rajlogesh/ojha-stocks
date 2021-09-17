import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';



@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})


export class TableDetailComponent implements OnInit {

  userFeedback = 'none';
  table_details_form;
  breakpoint;
  tableDetailsData = {};

  tableName: string;
  loading                     = true;
  DisplayedColumns: string[]  = ['tableName','description','partitionKeyName','rowKeyName'];
  dataSource: any             = new MatTableDataSource();
  interdataTableDetail        = [];
  private DeleteUserStatus = new BehaviorSubject('initial');

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private interdatafacade: InterdataFacadeService,
    public location: Location,
    private commonHelper: CommonHelperService,
    private router: Router
  ) {
    this.registerFormControl();
   }

  ngOnInit(): void {
    this.fetchRouteParams();
    // this.fetchInterdataDetails();
    this.fetchTableDetails();
    this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  }

  registerFormControl() {
    this.table_details_form = this.fb.group({
      tableName: ['', [Validators.required, Validators.minLength(2)]],
      tableLabel: ['', Validators.required],
      description: ['', [Validators.required]],
      partitionKeyName: ['', Validators.required],
      rowKeyName: ['', Validators.required]
    });
  }

  fetchTableDetails() {
    this.interdatafacade.getinterdataTableDetail(this.route.snapshot.params.tableName).subscribe((response: Array<any>) => {
        this.loading = false;
        this.tableDetailsData = response;
        this.table_details_form.patchValue(response);
      });
   }

   get tableDetailsFormControls() {
    return this.table_details_form.controls;
  }

  updateInterdataTable() {
    this.userFeedback = "loading";
    const formContent = this.table_details_form.value;
    const payload = {
      "tableName": formContent['tableName'],
      "tableLabel": formContent['tableLabel'],
      "description": formContent['description'],
      "partitionKeyName": formContent['partitionKeyName'],
      "rowKeyName": formContent['rowKeyName'],
      "tenantId": this.commonHelper.getTenantId(),
      "createdTime": new Date().toISOString(),
      "updatedTime": new Date().toISOString()
    };
    this.interdatafacade.createInterdataTable(payload)
      .subscribe(result => {
        this.setErrorCode('success', true);
      }, error => {
        this.setErrorCode('failure');
      });
  }

  setErrorCode(msg, goback = false) {
    this.userFeedback = msg;
    setTimeout(() => {
      this.userFeedback = 'none';
      if (goback !== false) {
        this.location.back();
      }
    }, environment.errorMsgDly);
  }

  deleteConfirmation(e) {
    this.interdatafacade.deleteTableData(this.route.snapshot.params.tableName).subscribe(
     (response) => {
       this.DeleteUserStatus.next('deletesuccess');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
      //  this.fetchTableList(this.tableRequestData);
       this.fetchTableDetails();
       this.router.navigate(['/interdata/tables']);
     },
     (error) => {
       this.DeleteUserStatus.next('deletefailed');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
     }
    );
  }
  fetchRouteParams() {
    this.tableName = this.route.snapshot.params.tableName;
  }



  // fetchInterdataDetails() {
  //   this.loading = true;
  //   this.interdatafacade.getinterdataTableDetail(this.route.snapshot.params.tableName)
  //     .subscribe(
  //       (response: Array<any>)=>{
  //         this.loading = false;
  //         this.interdataTableDetail = [response];
  //         this.dataSource = new MatTableDataSource(this.interdataTableDetail);
  //         this.dataSource.sort = this.sort;
  //       },
  //       (error)=>{
  //         this.loading = false;
  //       }
  //     );
  // }



}
