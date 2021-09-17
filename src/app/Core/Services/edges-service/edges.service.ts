import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EdgesService {

  constructor(
    private http: HttpClient,
    private httpHelper: HttpHelperService
  ) { }

  getEdges(offset, limit) {
    const params = new HttpParams()
      .set('offsetKey', offset)
      .set('limit', limit);

    const apiUrl = this.httpHelper.apiUrl('edges');
    return this.http.get(apiUrl, { params: params });
  }

  createEdge(data) {
    const apiUrl = this.httpHelper.apiUrl('edges');
    return this.http.post(apiUrl, data);
  }

  getEdgeDetail(id) {
    const apiUrl = this.httpHelper.apiUrl('edges/' + id);
    return this.http.get(apiUrl);
  }

  updateEdge(payload, id) {
    const apiUrl = this.httpHelper.apiUrl('edges/' + payload.id);
    return this.http.put(apiUrl, payload);
  }

  deleteEdge(id) {
    const apiUrl = this.httpHelper.apiUrl('edges/' + id);
    return this.http.delete(apiUrl);
  }

  getEdgeServices(id) {
    const apiUrl = this.httpHelper.apiUrl('edges/' + id + '/services');
    return this.http.get(apiUrl);
  }

  getHeartbeats(serviceId) {
    const apiUrl = this.httpHelper.apiUrl('edge-services/' + serviceId + '/heartbeats');
    return this.http.get(apiUrl);
  }

  getManifest(edgeServiceId){
    const apiUrl = this.httpHelper.apiUrl('edges/manifests/' + edgeServiceId);
    return this.http.get(apiUrl);
  }

  getLog(request) {
    const params = new HttpParams()
      .set('offset', request.offset)
      .set('limit', request.limit);
    const apiUrl = this.httpHelper.apiUrl('edge-services/' + request.id + '/logs');
    return this.http.get(apiUrl, { params: params });
  }

  getLogContent(request){
    const apiUrl = this.httpHelper.apiUrl('edge-services/' +request.edgeServiceId + '/logs/' + request.id)
    return this.http.get(apiUrl);
  }

  downloadLogFile(request){
      const apiUrl = this.httpHelper.apiUrl('edge-services/'+request.edgeServiceId+ '/logs/' +request.logId+ '/download')
      return this.http.get(apiUrl,{ responseType: 'blob' });
  }

  uploadCertificate(request){
    let headers = new HttpHeaders()
      .set('cert-passphrase', request.pass)
    const apiUrl = this.httpHelper.apiUrl('edges/certificates')
    return this.http.post(apiUrl,request.data,{ headers: headers});
  }
}
