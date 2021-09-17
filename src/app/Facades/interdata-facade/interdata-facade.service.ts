import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InterdataBusinessService } from 'src/app/Core/Business/Interdata/interdata-business.service';

@Injectable({
  providedIn: 'root'
})
export class InterdataFacadeService {

  constructor(
    private route: Router,
    private interviewbusiness: InterdataBusinessService
  ) { }

  getInterdataViewList(offsetKey, limit) {
    return this.interviewbusiness.getInterdataList(offsetKey, limit);
  }

  getInterdataTableList(offsetKey, limit) {
    return this.interviewbusiness.getInterdataTableList(offsetKey, limit);
  }

  getinterdataDetail(viewName, partitionKey, limit, continuationToken) {
    return this.interviewbusiness.getinterdataDetail(viewName, partitionKey, limit, continuationToken);
  }

  getinterdataTableDetail(viewName) {
    return this.interviewbusiness.getinterdataTableDetail(viewName);
  }

  getInterdataTableRecordPartitionKey(params) {
    return this.interviewbusiness.getInterdataTableRecordPartitionKey(params);
  }

  getinterdataViewDetail(tableName) {
    return this.interviewbusiness.getinterdataViewDetail(tableName);
  }
  navigateInterdataViewDetail(viewInfo) {
    this.route.navigate(['/interdata', 'views', viewInfo.view],
    {
      queryParams: {
        limit : viewInfo.limit ,
        page : viewInfo.pageNo,
        search: viewInfo.searchQuery
    },
    queryParamsHandling : 'preserve'});
  }

  navigateInterdataTableDetail(tableInfo) {
    this.route.navigate(['/interdata', 'tables', tableInfo.table],
    {
      queryParams: {
        limit : tableInfo.limit ,
        page : tableInfo.pageNo,
        search: tableInfo.searchQuery
      },
      queryParamsHandling : 'preserve'
    });
  }
  navigateInterdataUpdateTableRecord(recordInfo) {
    console.log(recordInfo);
    this.route.navigate(['/interdata', 'update-tables-record', ],
      {
        queryParams: {
            tableName : recordInfo.tableName,
            partitionKey : recordInfo.partitionKey,
            rowKey : recordInfo.rowKey
        },
      //   queryParamsHandling : 'preserve'
      }
      );
  }

  createInterdataTable(payload) {
    return this.interviewbusiness.createInterdataTable(payload);
  }

  createInterdataView(payload) {
    return this.interviewbusiness.createInterdataView(payload);
  }

  updateInterdataTableRecord(payload, id) {
    return this.interviewbusiness.updateInterdataTableRecord(payload, id);
  }

  deleteViewData(viewName) {
    return this.interviewbusiness.deleteViewData(viewName);
  }
  deleteTableData(tableName) {
    return this.interviewbusiness.deleteTableData(tableName);
  }
  deleteTableRecord(record) {
    return this.interviewbusiness.deleteTableRecord(record);
  }
  navigateTableRecord(record) {
    this.route.navigate(['/interdata', 'tables', record.tableName, 'records']);
  }

  getInterdataTableRecord(tableName, limit, continuationToken) {
    return this.interviewbusiness.getInterdataTableRecord(tableName, limit, continuationToken);
  }

  createInterdataTableRecord(tableName, payload, replace) {
    return this.interviewbusiness.createInterdataTableRecord(tableName, payload, replace);
  }

  getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken) {
    return this.interviewbusiness.getInterdataTableRecordPartition(tableName, partitionKey, limit, continuationToken);
  }
  deleteTablePartition(tableName, partitionKey) {
    return this.interviewbusiness.deleteTablePartition(tableName, partitionKey);
  }
  deleteTableRow(tableName, partitionKey, rowKey) {
    return this.interviewbusiness.deleteTableRow(tableName, partitionKey, rowKey);
  }
  getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken) {
    return this.interviewbusiness.getInterdataTableRecordPartitionRowId(tableName, partitionKey, rowKey, limit, continuationToken);
  }
}
