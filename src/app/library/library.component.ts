import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Library } from '../models/library.model';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  apiurl = 'Libraries';
  libraries: Library[] = [];
  selectedLibrary: Library | null = null;
  newLibrary: Library = { id: 0, name: '', location: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadLibraries();
  }

  // Load all libraries
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

  // Create a new library
  createLibrary(): void {
    this.apiService.post(this.apiurl,this.newLibrary).subscribe({
      next:(data) => {
        this.libraries.push(data); // Add the newly created library to the list
        this.newLibrary = { id: 0, name: '', location: '' };  // Reset the form
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
  });
  }

  // Select a library for editing
  selectLibrary(library: Library): void {
    this.selectedLibrary = { ...library };
  }

  // Update an existing library
  updateLibrary(): void {
    if (this.selectedLibrary) {
      this.apiService.put(this.apiurl,this.selectedLibrary).subscribe({
        next:(data) => {
          const index = this.libraries.findIndex(lib => lib.id === data.id);
          if (index !== -1) {
            this.libraries[index] = data; // Update the library in the list
          }
          this.selectedLibrary = null; // Clear selected library
        },
        error:(error) => {
          this.errorMessage = error.message;
        }
    });
    }
  }

  // Delete a library
  deleteLibrary(id: number): void {
    this.apiService.delete(this.apiurl,id).subscribe({
      next:() => {
        this.libraries = this.libraries.filter(lib => lib.id !== id); // Remove the deleted library
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
  });
  }
}
