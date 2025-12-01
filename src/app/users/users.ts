import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './user.interface'
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthCustomService } from '../auth-custom.service';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {


  
  private dataService = inject(UserService);
  users$: Observable<User[]> = this.dataService.getUsers();
  private authService = inject(AuthCustomService);

  isAuthenciated$ = this.authService.isAuthenticated$


}
