import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterdataComponent } from './interdata/interdata.component';
import { InterdataDetailsComponent } from './interdata-details/interdata-details.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { CreateInterdataTableComponent } from './create-interdata-table/create-interdata-table.component';
import { CreateInterdataViewComponent } from './create-interdata-view/create-interdata-view.component';
import { TableRecordComponent } from './components/table-record/table-record.component';
import { ViewDetailComponent } from './components/view-detail/view-detail.component';
import { UpdateTableRecordComponent } from './components/update-table-record/update-table-record.component';
import { CreateTableRecordComponent } from './components/create-table-record/create-table-record.component';

const routes: Routes = [
  {
    path: 'views/:viewName',
    component: InterdataDetailsComponent,
  },
  {
    path: 'tables/:tableName/records/create',
    component: CreateTableRecordComponent,
  },
  {
    path: 'tables/:tableName/records',
    component: TableRecordComponent,
  },
  {
    path: 'tables/:tableName',
    component: TableDetailComponent,
  },
  {
    path: 'update-tables-record',
    component: UpdateTableRecordComponent
  },
  {
    path: 'table/create',
    component: CreateInterdataTableComponent,
  },
  {
    path: 'view/create',
    component : CreateInterdataViewComponent
  },
  {
    path: 'view/:viewName',
    component: ViewDetailComponent,
  },
  {
    path: ':id',
    component: InterdataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterdataContainerRoutingModule {}
