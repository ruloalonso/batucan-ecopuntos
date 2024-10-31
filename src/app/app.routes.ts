import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { ActionFormComponent } from './action-form/action-form.component';
import { HomeComponent } from './home/home.component';
import { ActionTypeFormComponent } from './action-type-form/action-type-form.component';
import { ActionTypeComponent } from './action-type/action-type.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'hola',
    component: UserFormComponent,
  },
  {
    path: 'tipos',
    component: ActionTypeComponent,
  },
];
