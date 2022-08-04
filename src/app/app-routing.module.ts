import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
   redirectTo: '/home',
   pathMatch: "full"
  },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent,
    children:[
      {path: 'login-page', component: LoginPageComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
    ] },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
