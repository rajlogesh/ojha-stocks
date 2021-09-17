import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-activity-data-table',
  templateUrl: './activity-data-table.component.html',
  styleUrls: ['./activity-data-table.component.scss']
})
export class ActivityDataTableComponent implements OnInit {

  columnsToDisplay  = ['updatedTime', 'messageType', 'label', 'sender', 'source', 'messageSize'];
  dataSource: MatTableDataSource<any>;

  @Input('loading$') loading$;
  @Input('message$') message$;
  @Input('searchTerm$') searchTerm$;
  @Output('messageDetail') messageDetailEvent = new EventEmitter();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  messageActivityAvailable = true;
  messageDetail = {
    viewMessage: false,
    messageData: null
  };

  pageOptions   = [5, 10, 20, 30, 40, 50];
  pageLength    = environment.dataSetLimit;
  pageIndex     = 0;
  pageSize      = this.pageOptions[0];

  constructor() {
  }

  ngOnInit(): void {
    this.listenMessageActivity();
    this.searchTerm$.subscribe((query)=>{
      this.filterValue(query.toString());
    });
    
  }

  listenMessageActivity() {
    this.message$.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      if (typeof data === 'object' && data.length > 0) {
        this.messageActivityAvailable = true;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.pageLength = data.length;
      } else {
        this.messageActivityAvailable = false;
      }
    });
  }

  toggleRow(value) {
    this.messageDetail = {
      viewMessage: true,
      messageData: value
    };
    this.messageDetailEvent.emit(this.messageDetail);
  }

  filterValue(filterText: string) {
    if (this.dataSource !== undefined) {
      this.dataSource.filter  =   filterText.trim().toLocaleLowerCase();
    }
  }

}


