import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Library } from  './models/library.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  apiurl = 'libraries';
  libraries: Library[] = [];
  selectedLibrary: Library | null = null;
  newLibrary: Library = { id: 0, name: '', location: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadLibraries();
  }


  loadLibraries(): void {
    this.apiService.get(this.apiurl).subscribe({
      next: (data) => {
        this.libraries = data.items;
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
    });
  }

  
  createLibrary(): void {
    this.apiService.post(this.apiurl,this.newLibrary).subscribe({
      next:(data) => {
        this.libraries.push(data); 
        this.newLibrary = { id: 0, name: '', location: '' };  
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
  });
  }

  selectLibrary(library: Library): void {
    this.selectedLibrary = { ...library };
  }

 
  updateLibrary(): void {
    if (this.selectedLibrary) {
      this.apiService.put(this.apiurl+'/'+this.selectedLibrary.id,this.selectedLibrary).subscribe({
        next:(data) => {
          const index = this.libraries.findIndex(lib => lib.id === data.id);
          if (index !== -1) {
            this.libraries[index] = data; 
          }
          this.selectedLibrary = null; 
        },
        error:(error) => {
          this.errorMessage = error.message;
        }
    });
    }
  }

 
  deleteLibrary(id: number): void {    
    this.apiService.delete(this.apiurl+'/'+id, "").subscribe({
      next:() => {
        this.libraries = this.libraries.filter(lib => lib.id !== id); 
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
  });
  }
  
}
