import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedContainerModule } from './View/shared-container/shared-container.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './Core/Interceptors/Auth';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedContainerModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
