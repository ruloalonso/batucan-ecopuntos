import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActionTypeService } from '../services/action-type.service';

@Component({
  selector: 'app-action-type-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './action-type-list.component.html',
  styleUrl: './action-type-list.component.scss',
})
export class ActionTypeListComponent {
  actionTypes$ = this.actionTypeService.actionTypes$;

  constructor(private actionTypeService: ActionTypeService) {}
}
