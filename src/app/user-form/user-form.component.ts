import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  constructor(private userService: UserService, private router: Router) {}

  name: string | undefined;
  error$ = this.userService.error$;

  registerUser(): void {
    if (this.name) {
      this.userService.createUser(this.name).subscribe((user) => {
        this.router.navigate(['/']);
      });
    }
    this.name = '';
  }
}
