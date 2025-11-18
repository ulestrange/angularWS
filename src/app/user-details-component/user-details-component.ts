import { Component, inject, Pipe } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { UserService } from '../users/user.service';
import { Observable } from 'rxjs';
import { User } from '../users/user.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TestForm } from '../test-form/test-form';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-details-component',
  imports: [RouterModule, AsyncPipe, TestForm, DatePipe, MatCardModule, MatButton],
  templateUrl: './user-details-component.html',
  styleUrl: './user-details-component.scss'
})
export class UserDetailsComponent {

  private route = inject(ActivatedRoute);
  private userService = inject (UserService);
  private router = inject(Router);

  id: string = "";
  showForm: boolean = false;
  user$ : Observable<User> | undefined


  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id') || "";

    if (this.id) {
      this.user$ = this.userService.getUserById(this.id)

    }
  }


    deleteUser() : void {


    if (this.id) {
    this.userService.deleteUser(this.id)
    .subscribe({
      next: response => {   
        this.router.navigateByUrl('/user-list')
      },
      error: (err : Error) => {
          console.log (err.message);
      }})

    }
  }

  editUser(): void{
    this.showForm = true;
  }

  cancelEdit(): void{
    this.showForm = false;
  }

}
