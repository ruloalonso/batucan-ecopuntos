import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActionTypeService } from '../services/action-type.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-action-type-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './action-type-form.component.html',
  styleUrl: './action-type-form.component.scss',
})
export class ActionTypeFormComponent {
  constructor(
    private userService: UserService,
    private actionTypeService: ActionTypeService
  ) {}

  users$ = this.userService.users$;

  name: string | undefined;
  points: number | undefined;

  createActionType(): void {
    if (this.name && this.points) {
      this.actionTypeService.createActionType(this.name, this.points);
      this.name = undefined;
      this.points = undefined;
    }
  }
}
