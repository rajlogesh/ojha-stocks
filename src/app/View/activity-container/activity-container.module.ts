import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityContainerRoutingModule } from './activity-container-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { ActivityMessageListComponent } from './components/activity-message-list/activity-message-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivityDataTableComponent } from './components/activity-data-table/activity-data-table.component';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityToolBarComponent } from './components/activity-tool-bar/activity-tool-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    ActivityComponent,
    ActivityMessageListComponent,
    ActivityDataTableComponent,
    ActivityToolBarComponent
  ],
  imports: [
    CommonModule,
    ActivityContainerRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class ActivityContainerModule { }
