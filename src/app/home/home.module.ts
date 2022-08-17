import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
// import { MaterialModule } from './../material/material.module';
import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { TableComponent } from './body/table/table.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [
    BodyComponent,
    TableComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
