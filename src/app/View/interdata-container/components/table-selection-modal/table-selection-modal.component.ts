import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-selection-modal',
  templateUrl: './table-selection-modal.component.html',
  styleUrls: ['./table-selection-modal.component.scss']
})
export class TableSelectionModalComponent implements OnInit {

  key:string = '';
  tableList:any = [];

  constructor(
    public modalRef: MatDialogRef<TableSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.close('');
  }

  search(viewName) {
    this.modalRef.close(viewName);
  }

}
