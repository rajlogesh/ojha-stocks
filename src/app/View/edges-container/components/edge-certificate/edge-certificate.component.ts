import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edge-certificate',
  templateUrl: './edge-certificate.component.html',
  styleUrls: ['./edge-certificate.component.scss']
})
export class EdgeCertificateComponent implements OnInit {

  details;
  fileContent;
  formatFileContent;
  userFeedback = 'none';
  upload_certificate_form;
  loading = false;
  request;
  constructor(
    private fb: FormBuilder,
    private edgeFacade: EdgesFacadeService,
  ) { }

  ngOnInit(): void {
    this.registerFormControl();
  }

  registerFormControl() {
    this.upload_certificate_form = this.fb.group({
      certPass: ['', Validators.required],
      certData: ['', Validators.required]
    });
  }

  uploadCertificate() {
    const formContent = this.upload_certificate_form.value;
    const payload = {
      pass: formContent['certPass'],
      data: formContent['certData']
    }
    this.edgeFacade.uploadCertificate(payload)
      .subscribe(
        (response) => {
          if (Object.keys(response).length > 0) {
            this.details = response;
            this.userFeedback = "success";
          } else {
            this.userFeedback = "failure";
            setTimeout(()=>{
              this.userFeedback = 'none';
            }, environment.errorMsgDly);
          }
        },
        (error) => {
          this.userFeedback = "failure";
          setTimeout(()=>{
            this.userFeedback = 'none';
          }, environment.errorMsgDly);
        }
      );
  }

  onUploadFile(fileList: FileList){
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.fileContent = fileReader.result;
      this.formatFileContent = window.btoa(this.fileContent);
      this.upload_certificate_form.patchValue({certData:this.formatFileContent});
    }
    fileReader.readAsBinaryString(file);
  }
}
