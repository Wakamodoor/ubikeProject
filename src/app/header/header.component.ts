import { getLocaleMonthNames } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output()
  // bool: EventEmitter<boolean>

  is2 = true
  darkOn = false
  isHome = true


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.goHome()
  }

  goHome() {
    this.router.navigate(['/home'],{queryParams:{is2: true}})
  }

  // sendIs2() {
  //   this.bool.emit(this.is2)
  // }

  sendIs2() {
    this.router.navigate(['/home'],{queryParams:{is2: this.is2}})
  }

}
