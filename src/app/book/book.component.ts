import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { Book } from './models/book.model';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  
  libraryId: number = 0;
  apiurl : string = '';
  books: Book[] = [];
  selectedBook: Book | null = null;
  newBook: Book = { id: 0, name: '', category: '', libraryId: 0 };
  errorMessage: string = '';
  successMessage: string = '';
  displayedColumns: string[] = ['name', 'category', 'actions'];
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.libraryId = +this.route.snapshot.paramMap.get('libraryId')!; 
    this.newBook.libraryId = this.libraryId;
    this.apiurl = 'libraries/'+this.libraryId+'/books';
    this.loadBooks();
  }
  loadBooks(): void {
    this.apiService.get(this.apiurl).subscribe({
      next: (data) => {
        this.books = data.items.filter((book: Book) => book.libraryId === this.libraryId);
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
    });
  } 
  createBook(): void {
    this.apiService.post(this.apiurl, this.newBook).subscribe({
      next: (data) => {
        this.books.push(data); 
        this.newBook = { id: 0, name: '', category: '', libraryId: this.libraryId };  
      },
      error:(error) => {
        this.errorMessage = error.message;
      }
    });
  }  
  selectBook(book: Book): void {
    this.selectedBook = { ...book };
  }
  updateBook(): void {
    if (this.selectedBook) {
      this.apiService.put(this.apiurl, this.selectedBook).subscribe({
        next: (data) => {
          const index = this.books.findIndex(bk => bk.id === data.id);
          if (index !== -1) {
            this.books[index] = data; 
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
  deleteBook(book: Book): void {
    this.apiService.delete(this.apiurl + book.id).subscribe({
      next: () => {
        this.books = this.books.filter(bk => bk.id !== book.id);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
 

}
