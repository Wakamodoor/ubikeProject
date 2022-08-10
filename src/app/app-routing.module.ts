import { AccountInfoComponent } from './account-info/account-info.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './login/signup/signup.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
   redirectTo: '/login/login-page',
   pathMatch: "full"
  },
  {path: 'header', component: HeaderComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', redirectTo: '/login/login-page', pathMatch:'full'},
  {path: 'login',  component: LoginComponent,
    children:[
      {path: 'login-page', component: LoginPageComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'reset-password', component: ResetPasswordComponent}
  ]},
  {path: 'accountInfo', component: AccountInfoComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
