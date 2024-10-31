import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionFormComponent } from './action-form/action-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './services/user.service';
import { ActionService } from './services/action.service';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionTypeService } from './services/action-type.service';
import { ActionTypeFormComponent } from "./action-type-form/action-type-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ActionFormComponent,
    UserFormComponent,
    UserListComponent,
    ActionListComponent,
    ActionTypeFormComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ecopuntos';

  constructor(
    private userService: UserService,
    private actionService: ActionService,
    private actionTypeService: ActionTypeService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.userService.getUsers();
    this.actionService.getActions();
    this.actionTypeService.getActionTypes();
    this.primengConfig.ripple = true;
  }
}
