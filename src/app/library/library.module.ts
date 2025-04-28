import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { LibraryRoutingModule } from './library-routing.module'; 


@NgModule({
  declarations: [LibraryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
