import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";



@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = {}

  database = getDatabase();
  postListRef = ref(this.database, 'users/');
  newPostRef = push(this.postListRef);

  starCountRef = ref(this.database, 'users/');


  constructor(private http: HttpClient, private router: Router) { }

  getAPI2() {
    return this.http.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
  }
  getAPI1() {
    return this.http.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
  }

  getDatabaseAPI() {
    return this.http.get('https://taipei-ubike-search-system-default-rtdb.firebaseio.com/')
  }

  createAccount = (accountData) => {
    return new Promise(resolve => {
      set(this.newPostRef, {
        account: accountData.Account,
        password: accountData.Password
      });
      this.router.navigate(['/login/login-page'])
      resolve('completed')
    })


    // set(ref(this.database, 'users/' + userId), {
    //   account: account,
    //   password: password
    // });
  }

  authAccountData = (account, password) => {
    onValue(this.starCountRef, (snapshot: any) => {
      this.data = JSON.parse(JSON.stringify(snapshot.val()))
      for(let i in this.data) {
        // console.log(this.data[i].account)
        if(account === this.data[i].account) {
          if(password === this.data[i].password) {
            // this.router.navigate(['/header'], {queryParams: {isHome: true}})
            this.router.navigate(['/accountInfo'], {queryParams: {accountID: i}})
            this.router.navigate(['/home'],{queryParams:{is2: true, isHome: true}})
            break
          }
        }
      }
    });
    // console.log()
  }

  checkAccountIfExist(account: string, password1?: string, password2?: string) {
    return new Promise((resolve, reject) => {
      let exist = false
      onValue(this.starCountRef, (snapshot: any) => {
        this.data = JSON.parse(JSON.stringify(snapshot.val()))
        if(password1 === undefined || password2 === undefined) {
          for(let i in this.data) {
            // console.log(this.data[i].account)
            if(account === this.data[i].account) {
              exist = true
              // console.log(exist)
              break
            }
          }
          resolve(exist)
        }else {
          for(let i in this.data) {
            // console.log(account)
            if(account === this.data[i].account) {
              // console.log(i)

              update(ref(this.database, 'users/' + `${i}`), {
                password: password2
              });
              break
            }
          }
          resolve('finish')
        }
      });
    })
  }

  deleteAccount(account: string) {
    onValue(this.starCountRef, (snapshot: any) => {
      this.data = JSON.parse(JSON.stringify(snapshot.val()))
      // remove(ref(this.database, 'users/' + `${i}`))
    })
  }


}
