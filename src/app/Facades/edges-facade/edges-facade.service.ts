import { Injectable } from '@angular/core';
import { EdgesBusinessService } from 'src/app/Core/Business/Edges/edges-business.service';

@Injectable({
  providedIn: 'root'
})
export class EdgesFacadeService {

  constructor(
    private edgesBusiness: EdgesBusinessService
  ) { }

  getEdges(pageNo) {
    return this.edgesBusiness.getEdges(pageNo);
  }

  createEdges(payload) {
    return this.edgesBusiness.createEdges(payload);
  }

  getEdgeDetail(id) {
    return this.edgesBusiness.getEdgeDetail(id);
  }

  updateEdge(payload) {
    return this.edgesBusiness.updateEdge(payload);
  }

  deleteEdge(id) {
    return this.edgesBusiness.deleteEdge(id);
  }

  getEdgeServices(id) {
    return this.edgesBusiness.getEdgeServices(id);
  }

  getHeartbeats(request) {
    return this.edgesBusiness.getHeartbeats(request);
  }

  getManifest(request){
    return this.edgesBusiness.getManifest(request);
  }

  getLog(request) {
    return this.edgesBusiness.getLog(request);
  }

  getLogContent(request){
    return this.edgesBusiness.getLogContent(request);
  }

  downloadLogFile(request){
    this.edgesBusiness.downloadLogFile(request);
  }

  uploadCertificate(request){
    return this.edgesBusiness.uploadCertificate(request);
  }
}
