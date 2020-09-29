import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { StartComponent } from './start';
import { MyHeroesComponent } from './my-heroes';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'start', component: StartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-heroes', component: MyHeroesComponent },

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
