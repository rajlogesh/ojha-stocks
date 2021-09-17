import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdgesComponent } from './edges/edges.component';
import { CreateEdgesComponent } from './create-edges/create-edges.component';
import { EdgesDetailComponent } from './edges-detail/edges-detail.component';
import { EdgesLogsComponent } from './components/edges-logs/edges-logs.component';
import { LogContentComponent } from './components/edges-logs/log-content/log-content.component';
import { EdgeCertificateComponent } from './components/edge-certificate/edge-certificate.component';

const routes: Routes = [
  {
    path: 'security',
    component: EdgeCertificateComponent
  },
  {
    path: 'create',
    component: CreateEdgesComponent
  },
  {
    path: ':tab/:id/:eslog/:logid',
    component: LogContentComponent
  },
  {
    path: 'service/:id/:eslog',
    component: EdgesLogsComponent
  },
  {
    path: ':tab/:id',
    component: EdgesDetailComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: EdgesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdgesContainerRoutingModule { }
