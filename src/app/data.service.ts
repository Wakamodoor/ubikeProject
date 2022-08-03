import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAPI2() {
    return this.http.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
  }
  getAPI1() {
    return this.http.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
  }
}
