import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-interdata-view',
  templateUrl: './create-interdata-view.component.html',
  styleUrls: ['./create-interdata-view.component.scss']
})
export class CreateInterdataViewComponent implements OnInit {

  createTableForm;
  userFeedback = 'none';
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  tableList = [];
  offsetKey = '';
  limit = environment.dataSetLimit;

  constructor(private fb: FormBuilder,
              private interdataFacade: InterdataFacadeService,
              public location: Location,
              private commonHelper: CommonHelperService
    ) { }

  ngOnInit(): void {
    this.getTableList();
    this.registerFormControl();
  }

  registerFormControl() {
    this.createTableForm = this.fb.group({
      viewName: ['', [Validators.required]],
      viewNameLabel: ['', [Validators.required]],
      tableName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      partitionKeyName: ['', [Validators.required]],
      rowKeyName: ['', [Validators.required]],
      fields: ['']
    });
  }

  get getControls() {
    return this.createTableForm.controls;
  }

  get getFields() {
    return this.createTableForm.get('fields');
    // return this.createTableForm.get('fields') as FormArray;
  }

  addField(event){
    let input = event.input;
    let value = event.value;
    if((value || '').trim()){
      // console.log(...this.getFields.value);
      this.getFields.setValue([...this.getFields.value,value.trim()]);
      // this.getFields.push(this.fb.control(value.trim()));
    }
    if(input){
      input.value = '';
    }
  }

  removeField(index){
    if(index >= 0 ){
      this.getFields.value.splice(index,1);
      // this.getFields.removeAt(index);
    }
  }

  getTableList(){
    this.interdataFacade.getInterdataTableList(this.offsetKey, this.limit)
      .subscribe((response: any[]) => {
        response.forEach(res => {
          this.tableList.push(res['tableName']);
        })
      });
  }

  createInterdataTable() {
    this.userFeedback = 'loading';
    const formContent = this.createTableForm.value;
    const payload = {
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
    };

    console.log(payload);

    this.interdataFacade.createInterdataView(payload)
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
}
