import { Component } from '@angular/core';
import { ActionFormComponent } from "../action-form/action-form.component";
import { UserListComponent } from "../user-list/user-list.component";
import { ActionListComponent } from "../action-list/action-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActionFormComponent, UserListComponent, ActionListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
