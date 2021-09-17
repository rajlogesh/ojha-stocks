import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-change-logo',
  templateUrl: './change-logo.component.html',
  styleUrls: ['./change-logo.component.scss']
})
export class ChangeLogoComponent implements OnInit {

  selectedFileSource;
  selectedFile;
  loading = false;
  logoUploadSuccessMsg = false;
  logoUploadErrorMsg = false;


  @Input('logo$') logo$ = new Observable();
  @Output('uploadLogo$') uploadLogoEvent = new EventEmitter();
  @Input('logoPutStatus$') logoPutStatus$ = new Observable();
  @Output('reloadCurrentLogo') reloadCurrentLogoEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.listenLogoUpdationStatus();
  }

  onLogoChosen($event) {
    const file: File = $event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFileSource = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  uploadLogo() {
    this.loading = true;
    this.uploadLogoEvent.emit(this.selectedFile);
  }

  reloadCurrentLogo() {
    this.loading = true;
    this.reloadCurrentLogoEvent.emit('reload');
  }

  listenLogoUpdationStatus() {
    this.logo$.subscribe((logo) => {
      this.loading = false;
    });
    this.logoPutStatus$.subscribe(
      (response) => {
        switch(response) {
          case 'initial':
            this.loading = false;
            break;
          case 'pending':
            this.loading = true;
            break;
          case 'success':
            this.loading = false;
            this.selectedFile = null;
            this.selectedFileSource = null;
            this.logoUploadSuccessMsg = true;
            setTimeout(()=>{ 
              this.logoUploadSuccessMsg = false; 
              this.reloadCurrentLogo();
            }, environment.errorMsgDly);
            break;
          case 'failure':
            this.loading = false;
            this.logoUploadErrorMsg = true;
            setTimeout(()=>{ this.logoUploadErrorMsg = false; }, environment.errorMsgDly);
            break;
          default:
            this.loading = false;
        }
      }
    );
  }

}
