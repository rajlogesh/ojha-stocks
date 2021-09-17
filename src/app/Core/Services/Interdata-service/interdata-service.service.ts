import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHelperService } from '../../Helpers/http-helper/http-helper.service';


@Injectable({
  providedIn: 'root'
})
export class InterdataServiceService {

  constructor(
    private http: HttpClient,
    private httpHelper: HttpHelperService
  ) { }

  getInterdataList(offsetKey,limit) {
    let params = new HttpParams()
      .set('offsetKey', offsetKey)
      .set('limit', limit);
    const apiUrl = this.httpHelper.apiUrl('interdata/views');
    return this.http.get(apiUrl, {params : params });
  }

  getInterdataTableList(offsetKey,limit) {
     let params = new HttpParams()
      .set('offsetKey',offsetKey)
      .set('limit',limit)
      console.log("My side-----")
    const apiUrl = this.httpHelper.apiUrl('/globalshares/ojha/companydetails/v1/getall/comapany');
    //return this.http.get(apiUrl,{params: params});
    let reponse = this.http.get(apiUrl)
    console.log("----:"+reponse)
    console.log("----:"+reponse["responseID"])
    return this.http.get(apiUrl);
  }

  getInterdataPage(viewName, partitionkey, limit, continuationToken) {
    let params = new HttpParams()
      .set('viewName', viewName)
      .set('partition', partitionkey)
      .set('action', 'scan')
      .set('limit', limit)
      .set('continuationToken', continuationToken);

    const apiUrl = this.httpHelper.apiUrl('interdata/views/' + viewName + '/data');
    return this.http.get(apiUrl, { params: params });

  }

  getinterDataviewDetail(viewName, partitionKey, limit, continuationToken) {
    let params = new HttpParams()
      .set('viewName', viewName)
      .set('partition', partitionKey)
      .set('action', "scan")
      .set('limit', limit)
      .set('continuationToken', continuationToken);

    const apiUrl = this.httpHelper.apiUrl('interdata/views/' + viewName +'/data');
    return this.http.get(apiUrl, { params: params });
  }

  getinterdataTableDetail(tableName) {
    let params = new HttpParams()
      .set('tableName', tableName);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName);
    return this.http.get(apiUrl, { params: params });

  }

  getInterdataTableRecordPartitionKey(params) {
    let paramsUp = new HttpParams()
    .set('tableName', params.tableName)
    .set('partitionKey' , params.partitionKey)
    .set('rowKey' , params.rowKey);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + params.tableName + '/items/partition/' + params.partitionKey + '/row/' + params.rowKey);
    return this.http.get(apiUrl, { params: paramsUp });
  }

  getinterdataViewDetail(viewName) {
    let params = new HttpParams()
    .set('viewName', viewName);
    const apiUrl = this.httpHelper.apiUrl('interdata/views/' + viewName);
    return this.http.get(apiUrl, { params: params });
  }

  createInterdataTable(payload) {
    const apiUrl = this.httpHelper.apiUrl('/globalshares/ojha/companydetails/v1/save/comapanydetails');
    return this.http.post(apiUrl, payload);
  }

  createInterdataView(payload) {
    const apiUrl = this.httpHelper.apiUrl('interdata/views');
    return this.http.post(apiUrl, payload);
  }

  updateInterdataTableRecord(payload,id) {
    let params = new HttpParams()
      .set('eTag', id.eTag);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + id.tableName + '/items/partition/' + id.partitionKey + '/row/' + id.rowKey);
    return this.http.put(apiUrl, payload, { params: params });
  }

  deleteViewData(viewName) {
    let params = new HttpParams()
      .set('viewName', viewName);
    const apiUrl = this.httpHelper.apiUrl('interdata/views/' + viewName);
    return this.http.delete(apiUrl, { params: params });
  }

  deleteTableData(tableName) {
    // console.log('tb');
    
    const apiUrl = this.httpHelper.apiUrl('/globalshares/ojha/companydetails/v1/delete/comapanydetails/' + tableName);
    return this.http.delete(apiUrl);
  }
  deleteTableRecord(record){
    // let params = new HttpParams()
    //   .set('tableName', record.tableName)
    //   .set('partitionKey', record.partitionKey)
    //   .set('rowKey' , record.rowKey);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + record.tableName + '/items/partition/' + record.partitionKey + '/row/' + record.rowKey);
    return this.http.delete(apiUrl);
  }
  deleteTablePartition(tableName , partitionKey) {
    let params = new HttpParams()
      .set('tableName', tableName)
      .set('partitionKey', partitionKey);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName + '/items/partition/' + partitionKey);
    return this.http.delete(apiUrl, { params: params });
  }

  deleteTableRow(tableName, partitionKey, rowKey) {
    let params = new HttpParams()
      .set('tableName', tableName)
      .set('partitionKey', partitionKey)
      .set('rowKey' , rowKey);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName + '/items/partition/' + partitionKey + '/row/' + rowKey);
    return this.http.delete(apiUrl, { params: params });
  }

  getInterdataTableRecord(tableName, limit, continuationToken){
    let params = new HttpParams()
    .set('tableName', tableName)
    .set('limit', limit)
    .set('clientRequestId', "")
    .set('continuationToken', continuationToken);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName +'/scan');
    return this.http.get(apiUrl, { params: params });
  }

  createInterdataTableRecord(tableName, payload, replace) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8');
    let params = new HttpParams()
    .set('replace', replace);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName + '/items' );
    return this.http.post(apiUrl, payload, { headers: headers, params: params });
  }

  getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken){
    let params = new HttpParams()
    .set('tableName', tableName)
    .set('partitionKey', partitionKey)
    .set('limit', limit)
    .set('clientRequestId', "")
    .set('continuationToken', continuationToken);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName + '/items/partition/' + partitionKey);
    return this.http.get(apiUrl, { params: params });
  }

  getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken) {
    let params = new HttpParams()
    .set('tableName', tableName)
    .set('partitionKey', partitionKey)
    .set('rowKey', rowKey)
    .set('limit', limit)
    .set('clientRequestId', "")
    .set('continuationToken', continuationToken);
    const apiUrl = this.httpHelper.apiUrl('interdata/tables/' + tableName + '/items/partition/' + partitionKey + '/row/' + rowKey);
    return this.http.get(apiUrl, { params: params });
  }
}
