import { ActivatedRoute, Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  accountID: string

  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone) {
    // console.log('running')
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(data => {
    //   console.log(data)
    //   this.accountID = JSON.parse(data['accountID'])
    // })
    this.zone.onUnstable.subscribe(() => { console.log('有事件發生了') });
    this.zone.onStable.subscribe(() => { console.log('事件結束了') });
  }



}
