import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { delay, Observable, of } from 'rxjs';
import { User } from './user.interface'
import { AsyncPipe } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  service = inject(UserService)
  
  private dataService = inject(UserService);

  errorMessage? : string;
  

users$ = this.dataService.getUsers().pipe(
  catchError(error => {
    console.error('Error loading users', error);
    this.errorMessage = 'Failed to load users';
    return of([]); // Return empty array or fallback value
  })
);


}
