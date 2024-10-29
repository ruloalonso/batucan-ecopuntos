import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActionService } from '../services/action.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './action-list.component.html',
  styleUrl: './action-list.component.scss',
})
export class ActionListComponent {
  actions$ = this.actionService.actions$;

  constructor(private actionService: ActionService) {}
}
