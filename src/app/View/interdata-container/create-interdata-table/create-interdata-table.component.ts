import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InterdataFacadeService } from 'src/app/Facades/interdata-facade/interdata-facade.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { CommonHelperService } from 'src/app/Core/Helpers/common-helper/common-helper.service';

@Component({
  selector: 'app-create-interdata-table',
  templateUrl: './create-interdata-table.component.html',
  styleUrls: ['./create-interdata-table.component.scss']
})
export class CreateInterdataTableComponent implements OnInit {

  createTableForm;
  userFeedback = 'none';

  constructor(
    private fb: FormBuilder,
    private interdataFacade: InterdataFacadeService,
    public location: Location,
    private commonHelper: CommonHelperService
  ) { }

  ngOnInit(): void {

    this.registerFormControl();
  }

  registerFormControl() {
    this.createTableForm = this.fb.group({
      companyName: ['', [Validators.required]],
      companyCEO: ['', [Validators.required]],
      companyTurnover: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      stockExchangeList: ['', [Validators.required]]
    });
  }

  get getControls() {
    return this.createTableForm.controls;
  }

  createInterdataTable() {
    this.userFeedback = "loading";
    const formContent = this.createTableForm.value;
    const payload = {
      "companyName": formContent['companyName'],
      "companyCEO": formContent['companyCEO'],
      "companyTurnover": formContent['companyTurnover'],
      "companyWebsite": formContent['companyWebsite'],
      "stockExchangeList": formContent['stockExchangeList'].split(','),
    };
    console.log(payload);
    this.interdataFacade.createInterdataTable(payload)
      .subscribe(result => {
        this.setErrorCode('success', true);
      }, error => {
      console.log(error);
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
