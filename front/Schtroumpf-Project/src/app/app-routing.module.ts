import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ListSchtroumpfComponent } from './list-schtroumpf/list-schtroumpf.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ProfilSchtroumpfComponent } from './profil-schtroumpf/profil-schtroumpf.component';

const routes: Routes = [
  { path: '', component:LoginComponent, data: {}},
  { path: 'carnet', component:ListSchtroumpfComponent, data: {}, canActivate: [ListSchtroumpfComponent]},
  { path: 'account', component:CreateAccountComponent, data: {}},
  { path: 'profil', component:ProfilSchtroumpfComponent, data: {}, canActivate: [ProfilSchtroumpfComponent]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
