import { Router } from '@angular/router';
import { DataService } from '../../../assets/service/dataService/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  hide = true
  accountChecked: boolean
  accountID = ''
  tempAcc = ''

  constructor(private datasvc: DataService, private router: Router) { }

  ngOnInit(): void {
    this.accountChecked = false
  }

  async updateAccount(formData: any) {
    if(this.accountChecked === false) {
      if(await this.datasvc.checkAccountIfExist(formData.Account) === true) {
        this.tempAcc = formData.Account
        this.accountChecked = true
      }else {
        alert('輸入帳號不存在')
      }
    }else {
      if(formData.Password1 === formData.Password2) {
        await this.datasvc.checkAccountIfExist(this.tempAcc, formData.Password1 ,formData.Password2)
        this.router.navigate(['/login'])
      }
    }
  }
}
