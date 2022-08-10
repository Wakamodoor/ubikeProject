import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;

  constructor(private datasvc: DataService) { }

  ngOnInit(): void {
  }

  createAccount = async(form: any) => {
  let com = await this.datasvc.createAccount(form)
    if(com === 'completed') {
      console.log('gggg')
      window.location.reload()
    }
  }
}
