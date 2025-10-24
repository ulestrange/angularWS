import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './users/users';
import { UserFormComponent } from "./users/form/user/user";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Users, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angularWS');
}
