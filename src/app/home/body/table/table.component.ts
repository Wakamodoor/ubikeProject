// import { DataService } from './../../data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  data: Array<object>;

  @Input()
  is2: boolean;

  @Input()
  lang: string;

  //for table
  displayedColumns: string[] = ['sarea','sna','ar','sbi','bemp'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
