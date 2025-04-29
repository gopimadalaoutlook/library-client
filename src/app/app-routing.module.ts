import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'libraries', 
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule),
    canActivate: [authGuard]
 },
 {
    path: 'library/:libraryId/books',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule),
    canActivate: [authGuard]
  }, 
  {
    path: 'login',  component: LoginComponent
  },
  {
    path: '',  redirectTo: '/libraries', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/libraries' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
