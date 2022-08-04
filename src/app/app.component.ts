import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  is2 = true

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.router.navigate([''])
  }

  sendIs2() {
    this.router.navigate(['/home'],{queryParams:{is2: this.is2}})
  }
}
