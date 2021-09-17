import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsContainerRoutingModule } from './settings-container-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeLogoComponent } from './components/change-logo/change-logo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiKeyComponent } from './components/api-key/api-key.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SettingsComponent, ProfileComponent, ChangePasswordComponent, ChangeLogoComponent, ApiKeyComponent],
  imports: [
    CommonModule,
    SettingsContainerRoutingModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class SettingsContainerModule { }
