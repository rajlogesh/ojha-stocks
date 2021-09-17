import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import { InterdataFacadeService} from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { environment} from 'src/environments/environment';
import {  Location} from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import {  CommonHelperService} from 'src/app/Core/Helpers/common-helper/common-helper.service';


@Component({
  selector: 'app-create-table-record',
  templateUrl: './create-table-record.component.html',
  styleUrls: ['./create-table-record.component.scss']
})

export class CreateTableRecordComponent implements OnInit {

  createTableRecordForm;
  userFeedback = 'none';
  tableName;
  limit = 1;
  continuationToken = '';
  record = [];
  props = {};
  partitionKeyName = '';
  rowKeyName = '';
  formatPayload = {};
  replace: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private interdataFacade: InterdataFacadeService,
    public location: Location,
    private commonHelper: CommonHelperService
  ) {}

  ngOnInit(): void {
    this.fetchRouteParams();
    this.getInterdataTableList();
    this.registerFormGroup();
  }

  private getInterdataTableList() {
      this.interdataFacade.getinterdataTableDetail(this.tableName)
        .subscribe((res) => {
          this.partitionKeyName = res['partitionKeyName'];
          this.rowKeyName = res['rowKeyName'];
        });
    }

  fetchRouteParams() {
    this.route.params.subscribe((params) => {
      this.tableName = params.tableName || '';
    });
  }

  getPropertiesColumn() {
    this.interdataFacade.getInterdataTableRecord(this.tableName, this.limit, this.continuationToken)
      .subscribe(
        (response: any) => {
           this.record = this.getDisplayedColumns(response.result);
           this.record.forEach( rec => {
            this.props[rec] = [''];
          });
        },
        (error) => {

        }
      );
  }

  generateFormControls(response: any){
    let tempGroup: FormGroup = new FormGroup({});
    response.forEach(rec => {
      tempGroup.addControl(rec, new FormControl(''))
    })
    return tempGroup;
  }

  private getDisplayedColumns(response: any[]) {
    if (response.length > 0) {
      const props = Object.keys(response[0]['properties']);
      return props;
    }
  }


  registerFormGroup() {
    this.createTableRecordForm = this.fb.group({
      partitionKey: ['', [Validators.required]],
      rowKey: ['', [Validators.required]],
      properties:  this.fb.array([
        this.addPropFormGroup()
      ])
    });
  }


  get getProperties() {
    return this.createTableRecordForm.get('properties') as FormArray;
  }

  addProperties(): void {
    this.getProperties.push(this.addPropFormGroup());
  }

  removeProperty(index) {
    this.getProperties.removeAt(index);
  }

  addPropFormGroup(): FormGroup {
    return this.fb.group({
      propKey: ['', [Validators.required]],
      propValue: ['', [Validators.required]],
    });
  }

  onReplace(event) {
    if (event.checked === true) {
      this.replace = true;
    } else {
      this.replace = false;
    }
  }

  createTableRecord() {
    this.userFeedback = "loading";
    const formContent = this.createTableRecordForm.value;
    let proper = this.getFormattedResponse(formContent['properties']);
    let payload = {
      "partitionKey": formContent['partitionKey'],
      "eTag": '*',
      "rowKey": formContent['rowKey']
    };
    payload['properties'] = proper;
    this.interdataFacade.createInterdataTableRecord(this.tableName,payload,this.replace)
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

  private getFormattedResponse(response) {
    if (response.length > 0) {
      response.forEach(res => {
        this.formatPayload[res['propKey']] = res['propValue'];
      });
      return this.formatPayload;
    }
  }
}
