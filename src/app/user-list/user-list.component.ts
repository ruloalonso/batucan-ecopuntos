import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  constructor(
    private userService: UserService,
    private actionService: ActionService
  ) {}

  users$ = this.userService.users$;

  getUserPonts(user: User): number {
    return this.actionService.getPointsByUserId(user._id);
  }
}
