import { Routes, Router } from '@angular/router';

import { userGuard } from './guards/user.guard';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { GameComponent } from './components/game/game.component';
import { AccountComponent } from './components/account/account.component';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'categories/:id', component: CategoriesComponent }, 
    { path: 'account', component: AccountComponent, canActivate: [ userGuard ] }, 
    { path: 'game/:id', component: GameComponent, canActivate: [ userGuard ] }, 
];
