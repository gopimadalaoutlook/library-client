import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module'; 


import { FormsModule } from '@angular/forms';
import { BookComponent } from './book.component';


import { BookRoutingModule } from './book-routing.module';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BookRoutingModule,
    MaterialModule
  ]
})
export class BookModule { }
