import { Component, OnInit, EventEmitter } from '@angular/core';
import { SettingsFacadeService } from 'src/app/Facades/settings-facade/settings-facade.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ApiKey as ApiKeyModal } from '../../../Core/Models/api-key.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profileDetails;
  profileFetchError = false;

  private _Ipu: string;
  private IPUSubject = new BehaviorSubject(this._Ipu);
  IPU$: Observable<any> = this.IPUSubject.asObservable();

  private _logo: SafeResourceUrl;
  private LOGOSubject = new BehaviorSubject(this._logo);
  logo$: Observable<any> = this.LOGOSubject.asObservable();

  private logoPutStatus = new BehaviorSubject('');
  logoPutStatus$: Observable<any> = this.logoPutStatus.asObservable();

  private APIKey = new BehaviorSubject('');
  APIKey$: Observable<any> = this.APIKey.asObservable();

  private APIKeyStatus = new BehaviorSubject('initial');
  APIKeyStatus$: Observable<any> = this.APIKeyStatus.asObservable();

  constructor(
    private settingsFacade: SettingsFacadeService
  ) { }

  ngOnInit(): void {
    this.retreieveCurrentLogo();
    // this.retreieveAPIKey();
    // this.refreshKey();
    this.initialKey();
  }

  fetchProfileDetails(e) {
    this.settingsFacade.fetchProfileDetails()
      .subscribe((response) => {
        this.profileDetails = response;
      }, (error) => {
        this.profileFetchError = true;
        setTimeout(()=>{ this.profileFetchError = false; }, environment.errorMsgDly);
      });
  }

  updatePassword(payload) {
    this.settingsFacade.updatePassword(payload)
      .then((response) => {
        this.IPUSubject.next('success');
        this.IPUSubject.next(null);
      }).catch((error) => {
        this.IPUSubject.next('failed');
        this.IPUSubject.next(null);
      });
  }

  retreieveCurrentLogo() {
    this.settingsFacade.getTenantLogo()
      .then((logo) => {
        this.LOGOSubject.next(logo);
      })
      .catch((error) => {});
  }

  uploadLogo(image) {
    this.logoPutStatus.next('pending');
    this.settingsFacade.uploadTenantLogoToServer(image)
      .subscribe(
        (response) => {
          this.logoPutStatus.next('success');
        },
        (error) => {
          this.logoPutStatus.next('failure');
        }
      );
  }

  reloadCurrentLogo(e) {
    this.retreieveCurrentLogo();
  }

  retreieveAPIKey() {
    const apiKey = this.settingsFacade.getCurrentAPIKey();
    this.APIKey.next(apiKey);
  }

  refreshAPIKey(e) {
    if (e === 'delete') {
      this.deleteKey();
    } else {
      this.refreshKey();
    }
  }

  refreshKey() {
    this.settingsFacade.refreshAPIKey()
    .subscribe(
      (response: ApiKeyModal) => {
        this.APIKeyStatus.next('success');
        setTimeout(()=>{ this.APIKeyStatus.next('initial'); }, environment.errorMsgDly);
        this.APIKey.next(response.key);
      },
      (error) => {
        this.APIKeyStatus.next('failed');
        setTimeout(()=>{ this.APIKeyStatus.next('initial'); }, environment.errorMsgDly);
        this.retreieveAPIKey();
      }
    );
  }

  deleteKey() {
    this.settingsFacade.deleteAPIKey()
    .subscribe(
      (response)=>{
        this.APIKeyStatus.next('deletesuccess');
        setTimeout(()=>{ this.APIKeyStatus.next('initial'); }, environment.errorMsgDly);
        this.APIKey.next('');
      },
      (error)=>{
        this.APIKeyStatus.next('deletefailed');
        setTimeout(()=>{ this.APIKeyStatus.next('initial'); }, environment.errorMsgDly);
        this.retreieveAPIKey();
      }
    );
  }

  initialKey(){
    this.settingsFacade.getInitialAPIKey()
    .subscribe(
      (response: ApiKeyModal)=>{
        this.APIKey.next(response.key);
      }
    )
  }
}
