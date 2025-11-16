import { Component, inject, Pipe } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { UserService } from '../users/user.service';
import { Observable } from 'rxjs';
import { User } from '../users/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-details-component',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './user-details-component.html',
  styleUrl: './user-details-component.scss'
})
export class UserDetailsComponent {

  private route = inject(ActivatedRoute);
  private userService = inject (UserService);
  private router = inject(Router);

  id: string = "";
  user$ : Observable<User> | undefined


  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id') || "";

    if (this.id) {
      this.user$ = this.userService.getUserById(this.id)

    }
  }

}
