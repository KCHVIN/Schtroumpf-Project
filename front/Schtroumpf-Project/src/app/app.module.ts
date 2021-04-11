import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSchtroumpfComponent } from './list-schtroumpf/list-schtroumpf.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ManagementSchtroumpfComponent } from './management-schtroumpf/management-schtroumpf.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProfilSchtroumpfComponent } from './profil-schtroumpf/profil-schtroumpf.component';

@NgModule({
  declarations: [
    AppComponent,
    ListSchtroumpfComponent,
    ManagementSchtroumpfComponent,
    LoginComponent,
    CreateAccountComponent,
    ProfilSchtroumpfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
