import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdgesContainerRoutingModule } from './edges-container-routing.module';
import { EdgesComponent } from './edges/edges.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CreateEdgesComponent } from './create-edges/create-edges.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EdgesDetailComponent } from './edges-detail/edges-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { EdgesUpdateComponent } from './components/edges-update/edges-update.component';
import { EdgeServicesComponent } from './components/edge-services/edge-services.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { EdgesHeartbeatsComponent } from './components/edges-heartbeats/edges-heartbeats.component';
import { EdgesManifestComponent } from './components/edges-manifest/edges-manifest.component';
import { EdgesLogsComponent } from './components/edges-logs/edges-logs.component';
import { LogContentComponent } from './components/edges-logs/log-content/log-content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { EdgeCertificateComponent } from './components/edge-certificate/edge-certificate.component';

@NgModule({
  declarations: [
    EdgesComponent,
    CreateEdgesComponent,
    EdgesDetailComponent,
    ConfirmDeleteComponent,
    EdgesUpdateComponent,
    EdgeServicesComponent, EdgesHeartbeatsComponent, EdgesManifestComponent,EdgesLogsComponent, LogContentComponent, EdgeCertificateComponent
  ],
  imports: [
    CommonModule,
    EdgesContainerRoutingModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule
  ]
})
export class EdgesContainerModule { }
