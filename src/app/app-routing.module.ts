import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './View/shared-container/layouts/main-layout/main-layout.component';
import { AdminGuard } from './Core/Guards/Admin/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/activity',
        pathMatch: 'full'
      },
      {
        path: 'activity',
        canActivateChild: [AdminGuard],
        data: { pageTitle: 'Activity' },
        loadChildren: () => import('./View/activity-container/activity-container.module').then(m => m.ActivityContainerModule)
      },
      {
        path: 'interdata',
        canActivateChild: [AdminGuard],
        data: {pageTitle: 'Interdata' },
        loadChildren: () => import('./View/interdata-container/interdata-container.module').then(m=>m.InterdataContainerModule)
      },
      {
        path: 'edges',
        canActivateChild: [AdminGuard],
        data: { pageTitle: 'Edges' },
        loadChildren: () => import('./View/edges-container/edges-container.module')
          .then(m => m.EdgesContainerModule)
      },
      {
        path: 'settings',
        canActivateChild: [AdminGuard],
        data: { pageTitle: 'Settings' },
        loadChildren: () => import('./View/settings-container/settings-container.module').then(m => m.SettingsContainerModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./View/auth-container/auth-container.module').then(m => m.AuthContainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

