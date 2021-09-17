import { Component, OnInit } from '@angular/core';
import { EdgesFacadeService } from 'src/app/Facades/edges-facade/edges-facade.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edges-detail',
  templateUrl: './edges-detail.component.html',
  styleUrls: ['./edges-detail.component.scss']
})
export class EdgesDetailComponent implements OnInit {

  tab = -1;
  tabCheck;
  edgeId;
  edgeData = {};
  eLimit;
  ePage;
  edgeSubject = new BehaviorSubject({});
  edge$ = this.edgeSubject.asObservable();
  serviceSubject = new BehaviorSubject({});
  service$ = this.serviceSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private edgesFacade: EdgesFacadeService
  ) {
    this.fetchRouteParams();
  }

  ngOnInit(): void {
  }

  fetchRouteParams() {
    this.route.params.subscribe((params)=>{
      if (params.id !== undefined && params.id !== null && params.id !== '') {
        this.edgeId = params.id;
        this.tabCheck = params.tab;
        this.fetchEdgeDetails();
      }
    });
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

  setTabValue(index) {
    this.tab = index;
    switch (this.tab) {
      case 0:
        this.router.navigate(['/edges','detail',this.edgeId], {
          queryParams: {
            elimit: this.eLimit,
            epage: this.ePage
          },
          queryParamsHandling: 'preserve'
        });
        break;
      case 1:
        this.router.navigate(['/edges','service',this.edgeId], {
          queryParams: {
            elimit: this.eLimit,
            epage: this.ePage
          },
          queryParamsHandling: 'preserve'
        });
        break;
    }
  }

  getTabValue() {
    if (this.tab === -1) {
      switch (this.tabCheck) {
        case 'detail':
          return this.tab = 0;
        case 'service':
          return this.tab = 1;
        default:
          break;
      }
    } else {
      return this.tab;
    }
  }
  parseEdgeRequest(request) {
    switch(request['key']) {
      case 'edgeDetail':
        this.fetchEdgeDetails();
        break;
      case 'edgeUpdate':
        this.updateEdgeDetails(request);
        break;
      case 'edgeDelete':
        this.deleteEdge(request);
        break;
      default:
        // Nothing
    }
  }

  fetchEdgeDetails() {
    this.edgesFacade.getEdgeDetail(this.edgeId)
      .subscribe(
        (res)=>{
          this.edgeData = res;
          this.edgeSubject.next({
            key: "edgeDetail",
            httpSuccess: true,
            data: res
          });
          this.serviceSubject.next({
            key: 'edgeListReceived',
            httpSuccess: true,
            data: res
          });
        },
        (error)=>{
          this.edgeSubject.next({
            key: "edgeDetail",
            httpSuccess: false,
            data: error
          });
          this.serviceSubject.next({
            key: 'edgeListReceived',
            httpSuccess: false,
            data: error
          });
        }
      );
  }

  updateEdgeDetails(request) {
    this.edgesFacade.updateEdge(request)
    .subscribe(
      (response)=>{
        this.edgeSubject.next({
          key: 'edgeUpdate',
          httpSuccess: true,
          data: response
        });
      },
      (error)=>{
        this.edgeSubject.next({
          key: 'edgeUpdate',
          httpSuccess: false,
          data: error
        });
      }
    );
  }

  deleteEdge(request) {
    this.edgesFacade.deleteEdge(request.params.id)
      .subscribe(
        (success)=>{
          this.edgeSubject.next({
            key: 'edgeDelete',
            httpSuccess: true,
            data: null
          });
        },
        (error)=>{
          this.edgeSubject.next({
            key: 'edgeDelete',
            httpSuccess: false,
            data: null
          })
        }
      );
  }

  parseServiceRequest(request) {
    switch(request['key']) {
      case 'serviceList':
        this.fetchServiceList();
        break;
      case 'heartbeats':
        this.fetchHeartbeats(request);
        break;
      case 'manifest':
        this.fetchManifest(request);
        break;
      case 'logs':
        this.fetchLog(request);
        break;
      default:
        // Nothing
    }
  }

  fetchServiceList() {
    this.edgesFacade.getEdgeServices(this.edgeId)
      .subscribe(
        (res) => {
          this.serviceSubject.next({
            key: 'serviceList',
            httpSuccess: true,
            data: res
          });
        },
        (err) => {
          this.serviceSubject.next({
            key: 'serviceList',
            httpSuccess: false,
            data: err
          });
        }
      );
  }

  fetchHeartbeats(request) {
    this.edgesFacade.getHeartbeats(request)
      .subscribe(
        (res) => {
          this.serviceSubject.next({
            key: 'heartbeats',
            httpSuccess: true,
            data: res['res'],
            index: res['index']
          });
        },
        (err) => {
          this.serviceSubject.next({
            key: 'heartbeats',
            httpSuccess: false,
            data: err['res'],
            index: err['index']
          });
        }
      );
  }

  fetchManifest(request){
    this.edgesFacade.getManifest(request)
    .subscribe(
      (res) => {
        this.serviceSubject.next({
          key: 'manifest',
          httpSuccess: true,
            data: res['res'],
            index: res['index']
          });
        },
        (err) => {
          this.serviceSubject.next({
            key: 'manifest',
            httpSuccess: false,
            data: err['res'],
            index: err['index']
          });
        }
      );
  }

  fetchLog(request){
    this.router.navigate(
      ['/edges','service',this.edgeId ,request.data], {
      queryParams: {
        elimit: this.eLimit,
        epage: this.ePage
      },
      queryParamsHandling: 'preserve'
    });
  }

}
