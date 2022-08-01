import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {distinct, map, skip, startWith} from 'rxjs/operators';




export interface User {
  area: string;
}


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  orig_data: any
  newData: any
  tempList = []



  //for sarea search
  myControl = new FormControl('');
  options: string[] = ['中正區', '萬華區', '中山區', '松山區', '大安區', '信義區', '內湖區', '南港區', '士林區', '北投區', '文山區', '大同區'];
  filteredOptions: Observable<string[]>;

  //sort

  re = /[\u4e00-\u9fa5]$/;

  checkDistrict(district: string) {
    if(this.re.test(district)) {
      // console.log(district)
      this.sortByArea(district)
    }
  }

  checkSearchText(searchText: string) {
    if(this.re.test(searchText)) {
      // console.log(searchText)
      this.sortByType(searchText)
    }
  }

  emptyText(len: number) {
    if(len === 0) {
      this.refresh()
    }
  }

  sortByArea = (district: string) => {
    this.newData = this.orig_data.filter(item => {
      return (item.sarea).includes(district)
    })
  }

  sortByType = (searchText: string) => {
    this.refresh()
    this.tempList = []
    if(searchText === "") {
      this.refresh()
    }else {
      this.orig_data.map((item: any, idx:number, arr: Array<object>) => {
        if((item.sna).includes(searchText)) {
          this.tempList.push(item)
        }
        return []
      })
    }
    this.newData = JSON.parse(JSON.stringify(this.tempList));
  }

  refresh() {
    this.newData = JSON.parse(JSON.stringify(this.orig_data));
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  constructor(private datasvc: DataService) { }

  ngOnInit() {
    this.datasvc.getAPI().subscribe(v => {
        this.orig_data = v
        this.newData = v
    })




    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }





}
