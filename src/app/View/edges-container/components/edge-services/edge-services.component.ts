import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edge-services',
  templateUrl: './edge-services.component.html',
  styleUrls: ['./edge-services.component.scss']
})
export class EdgeServicesComponent implements OnInit {

  loading = true;
  hbloading = false;
  mfloading = false;
  logLoading = false
  userFeedback = 'none';
  serviceList = [];
  heartBeatsList = {};
  toggleHBView = {};
  toggleMFView = {};

  eLimit;
  ePage;
  // toggleLogView = {};
  @Input('service$') service$ = new Observable();

  @Output('serviceRequest') serviceRequestEvent = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listenService();
    this.fetchRouteParams();
  }

  requestServiceList() {
    this.loading = true;
    this.serviceRequestEvent.emit({
      key: 'serviceList',
      params: null,
      data: null
    });
  }

  requestHearbeats(serviceId, index) {
    if (this.HeartbeatsAvailable(index) === true) {
      this.viewHeartBeats(serviceId);
    } else {
      this.hbloading = true;
      this.serviceList[index]['hbloading'] = true;
      this.serviceRequestEvent.emit({
        key: 'heartbeats',
        params: { serviceId: serviceId },
        data: null,
        extra: { index: index}
      });
    }
  }

  requestManifest(serviceId, index) {
    if (this.ManifestAvailable(index)===true) {
      this.viewManifest(serviceId);
    } else {
      this.mfloading = true;
      this.serviceList[index]['mfloading'] = true;
      this.serviceRequestEvent.emit({
        key: 'manifest',
        params: { serviceId: serviceId },
        data: null,
        extra: { index: index}
      });
    }
  }

  // requestLogs(serviceId, index ) {
  //   if (this.LogAvailable(index) === true) {
  //     this.viewLogs(serviceId);
  //   } else {
  //     this.logLoading = true;
  //     this.serviceList[index]['logLoading'] = true;
  //     this.serviceRequestEvent.emit({
  //       key: 'log',
  //       params: serviceId ,
  //       data: null,
  //       extra: { index }
  //     });
  //   }
  // }

  listenService() {
    this.service$.subscribe(
      (res) => {
        this.switchResponse(res);
      },
      (err) => {
        this.switchResponse(err);
      }
    );
  }

  equipHBVisiblityAndNode() {
    this.serviceList.forEach((service, index) => {
      // this.toggleLogView[service.id] = false;
      this.serviceList[index]['serviceList'] = [];
    });
  }

  // equipLogVisiblityAndNode() {
  //   this.serviceList.forEach((service, index) => {
  //     this.toggleLogView[service.id] = false;
  //     this.serviceList[index]['serviceList'] = [];
  //   });
  // }

  equipMFVisiblityAndNode() {
    this.serviceList.forEach((service, index) => {
      this.toggleMFView[service.id] = false;
      this.serviceList[index]['manifest'] = {};
    });
  }

  hideHeartBeats(id) {
    this.toggleHBView[id] = false;
  }

  viewHeartBeats(id) {
    this.toggleHBView[id] = true;
  }

  hideManifest(id) {
    this.toggleMFView[id] = false;
  }

  viewManifest(id) {
    this.toggleMFView[id] = true;
  }

  // hideLogs(id) {
  //   this.toggleLogView[id] = false;
  // }

  // viewLogs(id) {
  //   this.toggleLogView[id] = true;
  // }

  switchResponse(res) {
    switch(res['key']) {
      case 'serviceList':
        this.parseServiceList(res);
        break;
      case 'edgeListReceived':
        this.requestServiceList();
        break;
      case 'heartbeats':
        this.parseHeartbeats(res);
        break;
      case 'manifest':
        this.parseManifest(res);
        break;
      // case 'log':
      //   this.parseLog(res);
      //   break;
      default:
        // nothing
    }
  }

  parseServiceList(res) {
    if (res['httpSuccess']===true) {
      this.userFeedback = 'servicelistsuccess';
      this.serviceList = res['data'];
      this.equipHBVisiblityAndNode();
      this.equipMFVisiblityAndNode();
      this.loading = false;
      this.userFeedback = 'none';
      // setTimeout(()=>{
      //   this.userFeedback = 'none';
      // }, environment.errorMsgDly);
    } else {
      this.loading = false;
      this.userFeedback = 'servicelistfailure';
      setTimeout(()=>{
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  parseHeartbeats(res) {
    if (res['httpSuccess']===true) {
      this.loading = false;
      this.hbloading = false;
      this.serviceList[res['index']]['hbloading'] = false;
      if(res['data'].length > 0){
        this.serviceList[res['index']]['serviceList'] = res['data'];
        if (this.HeartbeatsAvailable(res['index']) === true) {
          const _serviceId = this.serviceList[res['index']]['serviceList'][0]['edgeServiceId'];
          this.viewHeartBeats(_serviceId);
        }
      }
      else{
        this.userFeedback = "heartbeatempty";
        this.serviceList[res['index']]['hbloading'] = false;
        this.loading = false;
        this.hbloading = false;
        setTimeout(() => {
          this.userFeedback = 'none';
        }, environment.errorMsgDly);
      }
    } else {
      this.userFeedback = 'heartbeatfailure';
      this.serviceList[res['index']]['hbloading'] = false;
      this.loading = false;
      this.hbloading = false;
      setTimeout(() => {
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  // parseLog(res) {
  //   if (res.httpSuccess === true) {
  //     this.loading = false;
  //     this.logLoading = false;
  //     this.serviceList[res['index']]['logLoading'] = false;
  //     this.serviceList[res['index']]['serviceList'] = res['data'];
  //   } else {
  //     this.userFeedback = 'heartbeatfailure';
  //     this.loading = false;
  //     this.logLoading = false;
  //     this.serviceList[res['index']]['logLoading'] = false;
  //     setTimeout(() => {
  //       this.userFeedback = 'none';
  //     }, environment.errorMsgDly);
  //   }
  // }

  parseManifest(res) {
    if (res['httpSuccess']===true) {
      this.loading = false;
      this.mfloading = false;
      this.serviceList[res['index']]['mfloading'] = false;
      if(res['data'] !== null){
        this.serviceList[res['index']]['manifest'] = res['data'];
        if (this.ManifestAvailable(res['index'])===true) {
          const _serviceId = this.serviceList[res['index']]['manifest']['edgeServiceId'];
          this.viewManifest(_serviceId);
        }
      }
      else{
        this.userFeedback = 'manifestempty';
        this.serviceList[res['index']]['mfloading'] = false;
        this.loading = false;
        this.mfloading = false;
        setTimeout(()=>{
          this.userFeedback = 'none';
        }, environment.errorMsgDly);
      }
    } else {
      this.userFeedback = 'manifestfailure';
      this.serviceList[res['index']]['mfloading'] = false;
      this.loading = false;
      this.mfloading = false;
      setTimeout(()=>{
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  get ServiceAvailable() {
    return (Object.keys(this.serviceList).length > 0)?(true):(false);
  }

  HeartbeatsAvailable(index) {
    return (Object.keys(this.serviceList[index]['serviceList']).length > 0) ? (true) : (false);
  }

  ManifestAvailable(index) {
    return (Object.keys(this.serviceList[index]['manifest']).length > 0 )?(true):(false);
  }

  isHBVisible(id) {
    return (this.toggleHBView[id] !== undefined && this.toggleHBView[id]===true)?(true):(false);
  }

  isMFVisible(id) {
    return (this.toggleMFView[id] !== undefined && this.toggleMFView[id]===true)?(true):(false);
  }

  // LogAvailable(index) {
  //   return (Object.keys(this.serviceList[index]['serviceList']).length > 0) ? (true) : (false) ;
  // }

  // isLogVisible(id) {
  //   return (this.toggleLogView[id] !== undefined && this.toggleLogView[id] === true) ? (true) : (false);
  // }

  viewLogs(id){
    this.serviceRequestEvent.emit({
      key: 'logs',
      data: id
    });
  }

  fetchRouteParams(){
    this.route.queryParams
      .subscribe(params => {
        if (params.hasOwnProperty('elimit')) {
          this.eLimit = params.elimit;
        }
        if (params.hasOwnProperty('epage')) {
          this.ePage = params.epage;
        }
      });
  }

  backToEdge(){
    this.router.navigate(
      ['/edges'], {
        queryParams: {
          elimit: this.eLimit,
          epage: this.ePage
        },
        queryParamsHandling: 'preserve'
      });
  }

}
