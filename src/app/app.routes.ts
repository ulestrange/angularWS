import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', redirectTo: '/'},
    {path: 'user-list', component: Users},
    ];

