import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edges-update',
  templateUrl: './edges-update.component.html',
  styleUrls: ['./edges-update.component.scss']
})
export class EdgesUpdateComponent implements OnInit {

  userFeedback = 'none';
  update_edge_form;
  edgeData = {};
  loading = true;
  eLimit;
  ePage;

  @Input('edge$') edge$ = new Observable();
  @Output('edgeRequest') edgeRequestEvent = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.registerFormControl();

  }

  ngOnInit(): void {
    this.listenEdge();
    this.fetchRouteParams();
  }

  listenEdge() {
    this.edge$.subscribe(
      (res)=>{
        this.loading = false;
        this.switchResponse(res);
      },
      (err)=>{
        this.loading = false;
        this.switchResponse(err);
      }
    );
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

  switchResponse(res) {
    switch(res['key']) {
      case 'edgeDetail':
        this.parseEdgeDetail(res);
        break;
      case 'edgeUpdate':
        this.parseEdgeUpdate(res);
        break;
      case 'edgeDelete':
        this.parseEdgeDelete(res);
        break;
      default:
        // do nothing
    }
  }

  parseEdgeDetail(res) {
    if (res['httpSuccess'] === true ) {
      this.edgeData = res.data;
      this.update_edge_form.patchValue(res['data']);
    } else {
      this.userFeedback = 'fetchFailed';
      setTimeout(()=>{
        this.userFeedback = 'none';
        this.router.navigate(['/edges'], {
          queryParams: {
            elimit: this.eLimit,
            epage: this.ePage
          },
          queryParamsHandling: 'preserve'
        });
      }, environment.errorMsgDly);
    }
  }

  parseEdgeUpdate(res) {
    if (res['httpSuccess'] === true) {
      this.userFeedback = 'success';
      setTimeout(()=>{
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    } else {
      this.userFeedback = 'failure';
      this.fetchEdgeDetails();
      setTimeout(()=>{
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  parseEdgeDelete(res) {
    if (res['httpSuccess'] === true) {
      this.userFeedback = 'delete';
      setTimeout(()=>{
        this.userFeedback = 'none';
        this.router.navigate(['/edges'], {
          queryParams: {
            elimit: this.eLimit,
            epage: this.ePage
          },
          queryParamsHandling: 'preserve'
        });
      }, environment.errorMsgDly);
    } else {
      this.userFeedback = 'deleteFailed';
      setTimeout(()=>{
        this.userFeedback = 'none';
      }, environment.errorMsgDly);
    }
  }

  registerFormControl() {
    this.update_edge_form = this.fb.group({
      edgename: ['', [Validators.required, Validators.minLength(2)]],
      edgelocation: ['', Validators.required],
      edgedescription: ['', Validators.required]
    });
  }

  get edgeFormControls() {
    return this.update_edge_form.controls;
  }

  updateEdges() {
    if (this.update_edge_form.valid) {
      this.loading = true;
      const formContent = this.update_edge_form.value;
      const payload = this.edgeData;
      payload['name'] = formContent['edgename'];
      payload['location'] = formContent['edgelocation'];
      payload['description'] = formContent['edgedescription'];

      this.edgeRequestEvent.emit({
        key: 'edgeUpdate',
        params: {
          id: this.edgeData['id']
        },
        data: payload
      });
    }
  }

  fetchEdgeDetails() {
    this.loading = true;
    this.edgeRequestEvent.emit({
      'key': 'edgeDetail',
      'params': null,
      'data': null
    });
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res===true) {
        this.deleteEdge();
      }
    });
  }

  deleteEdge() {
    this.loading = true;
    this.edgeRequestEvent.emit({
      key: 'edgeDelete',
      params: {
        id: this.edgeData['id']
      },
      data: null
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
