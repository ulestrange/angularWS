import { Routes } from '@angular/router';
import { App } from './app';
import { UserFormComponent } from './users/form/user/user';
import { Users} from './users/users';

export const routes: Routes = [
      {path: '', component: App},
      {path: 'form', component: UserFormComponent},
      {path: 'user-list', component: Users}
];
