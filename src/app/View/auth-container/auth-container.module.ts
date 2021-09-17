import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthContainerRoutingModule } from './auth-container-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InvitationFormComponent } from './components/invitation-form/invitation-form.component';
import { ConfirmInvitationComponent } from './components/confirm-invitation/confirm-invitation.component';


@NgModule({
  declarations: [NotFoundComponent, LoginComponent, RegisterComponent, UnauthorizedComponent, LoginFormComponent, InvitationFormComponent, ConfirmInvitationComponent],
  imports: [
    CommonModule,
    AuthContainerRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AuthContainerModule { }
