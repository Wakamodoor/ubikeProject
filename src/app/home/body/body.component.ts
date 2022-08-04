import { DataService } from './../../data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ControlContainer, FormControl} from '@angular/forms';
import {distinct, map, skip, startWith} from 'rxjs/operators';
import { getLocaleDateFormat, NumberFormatStyle } from '@angular/common';
import { TemplatePortal } from '@angular/cdk/portal';
import { ActivatedRoute } from '@angular/router';





export interface User {
  area: string;
}


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnChanges{

  // @Input()
  is2: boolean

  orig_data: any
  newData: any
  tempList = []
  orig_tempList = []
  fromType = false


  //for sarea search
  myControl = new FormControl('');
  options: string[] = ['中正區', '萬華區', '中山區', '松山區', '大安區', '信義區', '內湖區', '南港區', '士林區', '北投區', '文山區', '大同區'];
  filteredOptions: Observable<string[]>;

  //sort
  re = /[\u4e00-\u9fa5_0-9]$/;
  re2 = /[\u4e00-\u9fa5]$/;
  isEmpty = true

  checkDistrict(district: string, searchText: string) {
    if(this.re2.test(district)) {
      // console.log(district)
      this.sortByArea(district, searchText)
    }
  }

  checkSearchText(searchText: string) {
    if(this.re.test(searchText)) {
      // console.log(searchText)
      this.sortByType(searchText)
    }
  }

  areaEmptyCheck(len :number, searchText: string) {
    if(len === 0) {
      this.isEmpty = true
      this.emptyCheck(len, searchText)
    }
  }

  emptyCheck(len: number, searchText: string) {
    if(len === 0 && this.isEmpty === true) {
      this.refresh(searchText)
    }else if(this.isEmpty === false) {
      this.sortByBoth_del(searchText)
    }
  }

  sortByBoth_del(searchText: string) {
    this.tempList = []
    // console.log(searchText)
    this.orig_tempList.map((item: any) => {
      if(((item.sna).includes(searchText)) || ((item.ar).includes(searchText))) {
        this.tempList.push(item)
      }
      return []
    })
    this.newData = JSON.parse(JSON.stringify(this.tempList));
  }

  sortByArea = (district: string, searchText: string) => {
    this.orig_tempList = []
    this.newData = this.orig_data.filter(item => {
      return (item.sarea).includes(district)
    })
    this.orig_tempList = JSON.parse(JSON.stringify(this.newData));

    if(searchText !== '' && searchText !== undefined) {
      console.log(searchText)
      this.sortByType(searchText)
    }
  }

  sortByType = (searchText: string) => {
    this.tempList = []

    if(this.isEmpty === false) {
      this.orig_tempList.map((item: any) => {
        if(((item.sna).includes(searchText)) || ((item.ar).includes(searchText))) {
          this.tempList.push(item)
        }
        return []
      })
      this.newData = JSON.parse(JSON.stringify(this.tempList));

    }else {
      // this.refresh()
      this.orig_data.map((item: any) => {
        if(((item.sna).includes(searchText)) || ((item.ar).includes(searchText))) {
          this.tempList.push(item)
          // console.log(this.tempList)
        }
        return []
      })
      this.newData = JSON.parse(JSON.stringify(this.tempList));
    }
  }

  refresh(searchText?: string) {
    if(this.isEmpty === false) {
      if(searchText !== '' && searchText !== undefined) {
        this.sortByType(searchText)
      }else {
        this.newData = JSON.parse(JSON.stringify(this.orig_tempList));
      }
    }else if(this.fromType === true){
      this.newData = JSON.parse(JSON.stringify(this.orig_data));
      this.fromType = false
      // this.filteredOptions = this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value || '')),
      // );
    }else if(this.isEmpty === true){
      if(searchText !== '' && searchText !== undefined) {
        // console.log(searchText)
        this.sortByType(searchText)
      }else {
        this.newData = JSON.parse(JSON.stringify(this.orig_data));
      }
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  constructor(private datasvc: DataService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(bool => {
      this.is2 = JSON.parse(bool['is2'])
      console.log(this.is2)

      this.getData()
    })
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnChanges() {
    // console.log(this.is2)

  }


  getData = () => {
    this.tempList=[]

    if(this.is2 === true) {
      // console.log(is2)
      this.datasvc.getAPI2().subscribe((v: any) => {
        this.tempList = v
        this.tempList.sort((a, b) => {
          if(a.sarea < b.sarea) {
            return -1
          }
          if(a.sarea > b.sarea) {
            return 1
          }
          return 0
        })
        this.orig_data = this.tempList
        this.newData = this.tempList
      })
    }else {
      this.datasvc.getAPI1().subscribe((v: any) => {
        Object.keys(v.retVal).forEach((k) => {
          // console.log(v.retVal[`${k}`])
          this.tempList.push(JSON.parse(JSON.stringify(v.retVal[`${k}`])))
        });
        this.tempList.sort((a, b) => {
          if(a.sarea < b.sarea) {
            return -1
          }
          if(a.sarea > b.sarea) {
            return 1
          }
          return 0
        })
        // console.log(this.tempList)
        this.newData = this.tempList
        this.orig_data = this.tempList
      })
    }
  }
}


