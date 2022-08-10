import { Router } from '@angular/router';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  account = "";
  password = "";
  // #accountLogined
  hide = true;

  constructor(private datasvc: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  authAccount(formData) {
    // console.log(formData)
    this.datasvc.authAccountData(formData.Account, formData.Password)
    // return new Promise((resolve) => {
    //     resolve('ok')
    // })
  }

  // async refreshWindow(form) {
  //   let finish = await this.authAccount(form)
  //   console.log(finish)
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // }

}
