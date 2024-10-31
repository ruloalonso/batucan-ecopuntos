import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { ActionFormComponent } from './action-form/action-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: UserFormComponent,
  },
];
