import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { RemoveTableDataComponent } from '../interdata-table/remove-table-data/remove-table-data.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-table-record',
  templateUrl: './update-table-record.component.html',
  styleUrls: ['./update-table-record.component.scss']
})
export class UpdateTableRecordComponent implements OnInit {
  loading = true;
  tableDetailsData;
  tableDetailsDataName = [];
  tableRecordPartitionForm;
  addPropertyRecordForm;
  paramsRecord;
  fbGroupList;
  userFeedback;
  breakpoint;
  addFields = false;
  addFieldName = this.addFields ? 'Close' : 'Add Properties';
  formatPayload = {};
  private DeleteUserStatus = new BehaviorSubject('initial');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private interdatafacade: InterdataFacadeService,
    private dialog: MatDialog,
    public location: Location,
    private router: Router
  ) {

   }

  ngOnInit(): void {
    this.fetchTableRecord();
    this.registerFormGroup();
    this.breakpoint = (window.innerWidth <= 700) ? 2 : 12;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 2 : 12;
  }
  registerFormControl() {

    const formgroup = {

    };
    this.fbGroupList.forEach((item) => {
        formgroup[item] = item.required ? new FormControl( '', Validators.required)
                                                : new FormControl('');
    });
    this.tableRecordPartitionForm = new FormGroup(formgroup);

  }
  registerFormGroup() {
    this.addPropertyRecordForm = this.fb.group({
      properties:  this.fb.array([
        this.addPropFormGroup()
      ])
    });
  }
  get viewDetailsFormControls() {
    return this.tableRecordPartitionForm.controls[this.fbGroupList];
  }

  get getProperties() {
    return this.addPropertyRecordForm.get('properties') as FormArray;
  }


  addPropFormGroup(): FormGroup {
    return this.fb.group({
      propKey: ['', ],
      propValue: ['', ],
    });
  }

  addProperties() {
    this.addFields = !this.addFields;
    this.addFieldName = this.addFields ? 'Close' : 'Add Properties';

  }

  removeProperty(index) {
    this.tableDetailsDataName.splice(index, 1);
    this.fbGroupList.splice(index, 1);
  }

  private getFormattedResponse(response) {
    if (response.length > 0) {
      response.forEach(res => {
        this.formatPayload[res['propKey']] = res['propValue'];
      });
      return this.formatPayload;
    }
  }

  addPropertyRecord() {
    this.addFields = false;
    this.addFieldName = this.addFields ? 'Close' : 'Add Properties';
    this.userFeedback = 'loading';
    this.loading = true;
    const formContent = this.addPropertyRecordForm.value;
    const proper = this.getFormattedResponse(formContent['properties']);
    const payload = {

    };
    payload['properties'] = proper;
    let addProps;
    let addKeys;
    addProps = Object.keys(payload['properties']).map( (key) => {
      return [key, payload['properties'][key]];
    }
    );
    addKeys = Object.keys(payload['properties']).map( (key) => {
      return key;
    });
    this.tableDetailsDataName.push(...addProps);
    this.fbGroupList.push(...addKeys);
    setTimeout(() => {
      this.registerFormControl();
      const tableObj = {
      };
      this.tableDetailsDataName.map((item) => {
        tableObj[item[0]] = item[1];
      });
      this.tableRecordPartitionForm.setValue(tableObj);
      this.addPropertyRecordForm.setValue({
        properties: [
          {
            propKey: '',
            propValue: ''
          }
        ]
        });
      } , 1000);
    setTimeout(() => this.loading = false, 1300);

  }

  fetchTableRecord() {

      this.route.queryParams.subscribe((res) => {
        this.paramsRecord = {
          tableName : res.tableName,
          partitionKey : res.partitionKey,
          rowKey : res.rowKey
        };
        this.interdatafacade.getInterdataTableRecordPartitionKey(this.paramsRecord).subscribe((response) => {

          this.tableDetailsData =  response;
          this.fbGroupList = Object.keys(this.tableDetailsData.properties).map((key) => {
            return key;
          });
          this.tableDetailsDataName = Object.keys(this.tableDetailsData.properties).map((key, index) => {
            return [key , this.tableDetailsData.properties[key]];
          });

          setTimeout(() => {
            this.registerFormControl();
            this.tableRecordPartitionForm.setValue(this.tableDetailsData.properties);
          } , 1000);
          setTimeout(() => this.loading = false, 1300);
        });
      }
      );
  }

  updateViewDetails() {
    this.userFeedback = 'loading';
    const formContent = this.tableRecordPartitionForm.value;
    const params = {
      tableName : this.paramsRecord.tableName,
      partitionKey : this.paramsRecord.partitionKey,
      rowKey : this.paramsRecord.rowKey,
      eTag : this.tableDetailsData.eTag
    };
    const tempPayload = {};
    this.fbGroupList.map((item) => {
      tempPayload[item] = formContent[item];
    });
    const payload = {
      ...tempPayload
    };
    // console.log(payload);
    this.interdatafacade.updateInterdataTableRecord(payload, params)
    .subscribe(result => {
      this.setErrorCode('success', true);
    }, error => {
      this.setErrorCode('failure');
    });
  }

  confirmDelete(event) {
    const dialogRef = this.dialog.open(RemoveTableDataComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'delete') {
        this.deleteConfirmation(event);
      }
    });
  }

  deleteConfirmation(event) {
    const params = {
      tableName : this.paramsRecord.tableName,
      partitionKey : this.paramsRecord.partitionKey,
      rowKey : this.paramsRecord.rowKey,
    };
    this.interdatafacade.deleteTableRecord(params).subscribe(
      (response) => {
        this.DeleteUserStatus.next('deletesuccess');
        setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
       //  this.fetchTableList(this.tableRequestData);
        this.fetchTableRecord();
        this.router.navigate([`/interdata/tables/${this.paramsRecord.tableName}/records`]);
      },
      (error) => {
        this.DeleteUserStatus.next('deletefailed');
        setTimeout(() => { this.DeleteUserStatus.next('initial'); }, environment.errorMsgDly);
      }
     );
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
