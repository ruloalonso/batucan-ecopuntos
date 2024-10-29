import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ActionType } from '../models/action.model';
import { actionTypes } from '../models/action-types';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-action-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
  ],
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.scss',
})
export class ActionFormComponent {
  constructor(
    private userService: UserService,
    private actionService: ActionService
  ) {}

  users$ = this.userService.users$;
  actionTypes = actionTypes;

  date: Date | undefined;
  selectedUser: User | undefined;
  selectedActionType: ActionType | undefined;

  createAction(): void {
    if (this.selectedUser && this.date && this.selectedActionType) {
      this.actionService.createAction(
        this.selectedUser,
        this.date,
        this.selectedActionType
      );
      this.selectedUser = undefined;
      this.date = undefined;
      this.selectedActionType = undefined;
    }
  }
}
