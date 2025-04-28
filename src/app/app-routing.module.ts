import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'libraries', 
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
   {path: 'library/:libraryId/books',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
