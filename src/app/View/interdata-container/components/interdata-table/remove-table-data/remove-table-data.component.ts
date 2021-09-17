import { Component, OnInit, Inject, Output, EventEmitter, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, InterdataTableComponent } from '../interdata-table.component';

@Component({
  selector: 'app-remove-table-data',
  templateUrl: './remove-table-data.component.html',
  styleUrls: ['./remove-table-data.component.scss']
})

export class RemoveTableDataComponent implements OnInit {
  @Output('deleteConfirmation')
  deleteConfirmation = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<InterdataTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  onNoClick(args): void {
    this.dialogRef.close(args);
  }
   confirm(del) {
    this.deleteConfirmation.emit(del);
    this.dialogRef.close();
   }
   ngOnInit() {
  }
}
