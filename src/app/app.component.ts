import { LanguageService } from './../assets/service/languageService/language.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBmhT44Zr3ldJAV3hVjDiXQe3jRbLx0yE",
  authDomain: "taipei-ubike-search-system.firebaseapp.com",
  databaseURL: "https://taipei-ubike-search-system-default-rtdb.firebaseio.com",
  projectId: "taipei-ubike-search-system",
  storageBucket: "taipei-ubike-search-system.appspot.com",
  messagingSenderId: "67302015831",
  appId: "1:67302015831:web:38d5ddcb0bd74cfe2d3412",
  measurementId: "G-GCWFW7TY21"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  is2 = true
  darkOn: boolean

  constructor(private router: Router, private languageService: LanguageService) {
    this.languageService.setInitState();
  }

  ngOnInit(): void {
    // this.router.navigate([''])
  }

  sendIs2() {
    this.router.navigate(['/home'],{queryParams:{is2: this.is2}})
  }
}
