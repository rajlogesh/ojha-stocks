import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';


@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {

  userFeedback = 'none';
  view_details_form;
  breakpoint;
  viewDetailsData = {};
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];

  viewName: string;
  loading                     = true;
  DisplayedColumns: string[]  = ['viewName', 'viewNameLabel', 'tableName', 'description', 'partitionKeyName', 'rowKeyName'];
  dataSource: any             = new MatTableDataSource();
  interdataTableDetail        = [];
  private DeleteUserStatus = new BehaviorSubject('initial');

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commonHelper: CommonHelperService,
    private interdatafacade: InterdataFacadeService,
    public location: Location,
    private router: Router
  ) {
    this.registerFormControl();
   }

  ngOnInit(): void {
    this.fetchRouteParams();
    this.fetchViewDetails();
    this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  }

  registerFormControl() {
    this.view_details_form = this.fb.group({
      viewName: ['', [Validators.required, Validators.minLength(2)]],
      viewNameLabel: ['', Validators.required],
      tableName: ['', Validators.required],
      description:  ['', Validators.required],
      partitionKeyName: ['', Validators.required],
      rowKeyName: ['', Validators.required],
      fields: this.fb.array([])
    });
  }

  fetchViewDetails() {
    this.interdatafacade.getinterdataViewDetail(this.route.snapshot.params.viewName)
    .subscribe((response: Array<any>) => {
        this.loading = false;
        this.viewDetailsData = response;
        this.view_details_form.patchValue(response);
        response['fields'].forEach(element => {
          this.view_details_form.controls['fields'].push(this.fb.control(element));
        });
      });
   }
   get viewDetailsFormControls() {
    return this.view_details_form.controls;
  }

  get getFields() {
    return this.view_details_form.get('fields') as FormArray;
  }

  addField(event){
    let input = event.input;
    let value = event.value;
    if((value || '').trim()){
      this.getFields.push(this.fb.control(value.trim()));
    }
    if(input){
      input.value = '';
    }
  }

  removeField(index){
    if(index >= 0 ){
      this.getFields.removeAt(index);
    }
  }

  updateViewDetails() {
    this.userFeedback = 'loading';
    const formContent = this.view_details_form.value;
    const payload = {
      ...this.viewDetailsData,
      "viewName": formContent.viewName,
      "viewNameLabel": formContent.viewNameLabel,
      "tableName": formContent.tableName,
      "description": formContent.description,
      "partitionKeyName": formContent.partitionKeyName,
      "rowKeyName": formContent.rowKeyName,
      "fields": formContent.fields,
      "tenantId": this.commonHelper.getTenantId(),
      "createdTime": new Date().toISOString(),
      "updatedTime": new Date().toISOString(),
    }
    this.interdatafacade.createInterdataView(payload)
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
    this.interdatafacade.deleteViewData(this.view_details_form.value.tableName).subscribe(
     (response) => {
       this.DeleteUserStatus.next('deletesuccess');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
      //  this.fetchTableList(this.tableRequestData);
       this.fetchViewDetails();
       this.router.navigate(['/interdata/views']);
     },
     (error) => {
       this.DeleteUserStatus.next('deletefailed');
       setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
     }
    );
  }

  fetchRouteParams() {
    this.viewName = this.route.snapshot.params.viewName;
  }
}
