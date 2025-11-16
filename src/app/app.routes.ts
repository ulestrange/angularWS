import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
//import { TestForm } from './test-form/test-form';
import { SingleUserComponent } from './single-user-component/single-user-component';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', redirectTo: '/', pathMatch: 'full'},
    {path: 'user-list', component: Users},
    {path: 'user-list/:id', component: SingleUserComponent},
    {path: 'form', 
        loadComponent: () => import('./test-form/test-form').then(m => m.TestForm)
    
    }];

