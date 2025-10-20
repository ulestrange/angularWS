import { Injectable, inject} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from './user.interface'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http =  inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/users'  // for now - we should read this from an env variable

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }
  
}
