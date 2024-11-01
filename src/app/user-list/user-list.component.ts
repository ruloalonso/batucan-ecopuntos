import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  users$ = this.userService.users$;
}
