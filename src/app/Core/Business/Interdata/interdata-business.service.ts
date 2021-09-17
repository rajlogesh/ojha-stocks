import { Injectable } from '@angular/core';
import { InterdataServiceService } from '../../Services/Interdata-service/interdata-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterdataBusinessService {

  constructor(
    private interdataService: InterdataServiceService
  ) { }

  getInterdataList(offsetKey, limit) {
    return this.interdataService.getInterdataList(offsetKey, limit);
  }

  getInterdataTableList(offsetKey, limit) {
    return this.interdataService.getInterdataTableList(offsetKey, limit);
  }

  getinterdataDetail(viewName, partitionKey, limit, continuationToken) {
      return this.interdataService.getinterDataviewDetail(viewName, partitionKey, limit, continuationToken);
  }

  getinterdataTableDetail(tableName) {
    return this.interdataService.getinterdataTableDetail(tableName);
  }

  getInterdataTableRecordPartitionKey(params) {
    return this.interdataService.getInterdataTableRecordPartitionKey(params)
  }

  getinterdataViewDetail(viewName) {
    return this.interdataService.getinterdataViewDetail(viewName);
  }

  createInterdataTable(payload) {
    return this.interdataService.createInterdataTable(payload);
  }

  createInterdataView(payload) {
    return this.interdataService.createInterdataView(payload);
  }

  updateInterdataTableRecord(payload, id) {
    return this.interdataService.updateInterdataTableRecord(payload, id);
  }

  deleteViewData(viewName) {
    return this.interdataService.deleteViewData(viewName);
  }

  deleteTableData(tableName) {
    return this.interdataService.deleteTableData(tableName);
  }
  deleteTableRecord(record){
    return this.interdataService.deleteTableRecord(record);
  }
  getInterdataTableRecord(tableName, limit, continuationToken){
    return this.interdataService.getInterdataTableRecord(tableName, limit, continuationToken);
  }
  createInterdataTableRecord(tableName,payload,replace) {
    return this.interdataService.createInterdataTableRecord(tableName,payload,replace);
  }

  getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken){
    return this.interdataService.getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken);
  }

  getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken) {
    return this.interdataService.getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken);
  }

  deleteTablePartition(tableName, partitionKey) {
    return this.interdataService.deleteTablePartition(tableName, partitionKey);
  }

  deleteTableRow(tableName, partitionKey, rowKey){
    return this.interdataService.deleteTableRow(tableName, partitionKey, rowKey);
  }
}
