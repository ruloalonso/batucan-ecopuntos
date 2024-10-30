import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionFormComponent } from './action-form/action-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './services/user.service';
import { ActionService } from './services/action.service';
import { ActionListComponent } from './action-list/action-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ActionFormComponent,
    UserFormComponent,
    UserListComponent,
    ActionListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ecopuntos';

  constructor(
    private userService: UserService,
    private actionService: ActionService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.userService.getUsers();
    this.actionService.getActions();
    this.primengConfig.ripple = true;
  }
}
