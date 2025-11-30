import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { TestForm } from './test-form/test-form';
import { UserDetailsComponent } from './user-details-component/user-details-component';
import { LoginComponent } from './login.component/login.component';
import { adminGuard, authGuard } from './auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', redirectTo: '/', pathMatch: 'full'},
    {path: 'user-list', component: Users},
    {path: 'form', component: TestForm,  canActivate: [authGuard]},
    {path: 'user-list/:id', canActivate: [adminGuard], component: UserDetailsComponent},
    {path: 'login', component: LoginComponent}
    ];

