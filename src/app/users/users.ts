import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './user.interface'
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  service = inject(UserService)
  
  private dataService = inject(UserService);
  users$: Observable<User[]> = this.service.getUsers();

}
