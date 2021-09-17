import { Injectable } from '@angular/core';
import { EdgesService } from '../../Services/edges-service/edges.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonHelperService } from '../../Helpers/common-helper/common-helper.service';

@Injectable({
  providedIn: 'root'
})
export class EdgesBusinessService {

  constructor(
    private edgesService: EdgesService,
    private commonHelper: CommonHelperService
  ) { }

  getEdges(pageNo) {
    const pageSize = environment.dataSetLimit;
    const start = this.commonHelper.calculatePageNo(pageNo, pageSize);
    return this.edgesService.getEdges(0, pageSize);
  }

  createEdges(payload) {
    return this.edgesService.createEdge(payload);
  }

  getEdgeDetail(id) {
    return new Observable((observer) => {
      this.edgesService.getEdgeDetail(id)
        .pipe(
          map(edge => {
            edge['edgename'] = edge['name'];
            edge['edgelocation'] = edge['location'];
            edge['edgedescription'] = edge['description'];
            return edge;
          })
        ).subscribe(
          (res) => {
            observer.next(res);
          },
          (err)=>{
            observer.error(err);
          }
        );
    });
  }

  updateEdge(payload) {
    console.log(payload);
    return this.edgesService.updateEdge(payload.data, payload.params.id);
  }

  deleteEdge(id) {
    return this.edgesService.deleteEdge(id);
  }

  getEdgeServices(id) {
    return this.edgesService.getEdgeServices(id);
  }

  getHeartbeats(request) {
    const returnIndex = request.extra.index;
    const serviceId = request.params.serviceId;
    return new Observable((observer) => {
      this.edgesService.getHeartbeats(serviceId)
        .subscribe(
          (res) => {
            observer.next({
              index: returnIndex,
              res: res
            });
          },
          (err) => {
            observer.error({
              index: returnIndex,
              res: err
            });
          }
        );
    });
  }

  getManifest(request){
    const returnIndex = request.extra.index;
    const serviceId = request.params.serviceId;
    return new Observable((observer)=>{
      this.edgesService.getManifest(serviceId)
        .subscribe(
          (res) => {
            observer.next({
              index: returnIndex,
              res: res
            });
          },
          (err) => {
            observer.error({
              index: returnIndex,
              res: err
            });
          }
        );
    });
  }

  getLog(request) {
    return  this.edgesService.getLog(request);
  }

  getLogContent(request){
    return this.edgesService.getLogContent(request);
  }

  downloadLogFile(request){
    this.edgesService.downloadLogFile(request)
    .subscribe(
      (response)=>{
        this.saveFile(response, request.contentType, request.fileName);
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  saveFile(data, fileContentType, fileName) {
    const blob = new Blob([data], { type: fileContentType });
    const url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
  }

  uploadCertificate(request){
    return this.edgesService.uploadCertificate(request);
  }
}
