import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { TestForm } from './test-form/test-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', redirectTo: '/'},
    {path: 'user-list', component: Users},
    {path: 'form', component: TestForm},
    ];

