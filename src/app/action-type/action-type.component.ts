import { Component } from '@angular/core';
import { ActionTypeListComponent } from "../action-type-list/action-type-list.component";
import { ActionTypeFormComponent } from "../action-type-form/action-type-form.component";

@Component({
  selector: 'app-action-type',
  standalone: true,
  imports: [ActionTypeListComponent, ActionTypeFormComponent],
  templateUrl: './action-type.component.html',
  styleUrl: './action-type.component.scss'
})
export class ActionTypeComponent {

}
