import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActionService } from '../services/action.service';
import { CommonModule } from '@angular/common';
import { Action } from '../models/action.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-action-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './action-list.component.html',
  styleUrl: './action-list.component.scss',
})
export class ActionListComponent {
  actions$ = this.actionService.actions$;

  selectedAction: Action | undefined;

  dialogVisible = false;

  constructor(
    private actionService: ActionService,
    private userService: UserService
  ) {}

  openDeleteDialog(action: Action): void {
    this.selectedAction = action;
    this.dialogVisible = true;
  }

  closeDeleteDialog(): void {
    this.selectedAction = undefined;
    this.dialogVisible = false;
  }

  deleteAction(): void {
    if (this.selectedAction) {
      this.actionService.deleteAction(this.selectedAction._id).subscribe(() => {
        if (this.selectedAction) {
          this.userService.addPoints(
            this.selectedAction.user,
            -this.selectedAction.points
          );
        }
        this.closeDeleteDialog();
      });
    }
  }
}
