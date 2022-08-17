import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output()
  // bool: EventEmitter<boolean>

  is2 = true
  darkOn: boolean = false
  isHome =  false


  constructor(private router: Router, private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(bool => {
    //   // this.isHome = JSON.parse(bool['isHome'])
    //   console.log(JSON.parse(bool['isHome']))
    // })
    // console.log('yoyo')

    (this.router.events.pipe(filter(event => event instanceof ActivationEnd)) as Observable<ActivationEnd>).subscribe(router => {
      if(router.snapshot.component.name === 'HomeComponent') {
        this.isHome = true
      }else {
        this.isHome = false
      }
    })
  }

  ngOnInit(): void {
    this.is2 = true
  }

  // changeColorMode() {
  //   if(this.darkOn === false) {
  //     this.darkOn = true
  //   }else {
  //     this.darkOn = false
  //   }
  // }

  goHome() {
    this.router.navigate(['/home'],{queryParams:{is2: true}})
  }

  sendIs2() {
    this.router.navigate(['/home'],{queryParams:{is2: this.is2}})
  }

}
