import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InterdataContainerRoutingModule } from './interdata-container-routing.module';
import { InterdataComponent } from './interdata/interdata.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterdataDetailsComponent } from './interdata-details/interdata-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TableSelectionModalComponent } from './components/table-selection-modal/table-selection-modal.component';
import { MatListModule } from '@angular/material/list';
import { InterdataViewComponent } from './components/interdata-view/interdata-view.component';
import { InterdataTableComponent } from './components/interdata-table/interdata-table.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { CreateInterdataTableComponent } from './create-interdata-table/create-interdata-table.component';
import { RemoveTableDataComponent } from './components/interdata-table/remove-table-data/remove-table-data.component';
import { CreateInterdataViewComponent } from './create-interdata-view/create-interdata-view.component';
import { TableRecordComponent } from './components/table-record/table-record.component';
import { ViewDetailComponent } from './components/view-detail/view-detail.component';
import { UpdateTableRecordComponent } from './components/update-table-record/update-table-record.component';
import { CreateTableRecordComponent } from './components/create-table-record/create-table-record.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    InterdataComponent,
    InterdataDetailsComponent,
    TableSelectionModalComponent,
    InterdataViewComponent,
    InterdataTableComponent,
    TableDetailComponent,
    CreateInterdataTableComponent,
    RemoveTableDataComponent,
    CreateInterdataViewComponent,
    TableRecordComponent,
    ViewDetailComponent,
    UpdateTableRecordComponent,
    CreateTableRecordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InterdataContainerRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatChipsModule,
  ]
})
export class InterdataContainerModule { }
