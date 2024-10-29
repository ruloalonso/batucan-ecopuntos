import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { generateRandomHash } from './core.utils';
import { mockUsers } from './users.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = new BehaviorSubject<User[]>([]);
  error = new BehaviorSubject<string>('');

  users$ = this.users.asObservable();
  error$ = this.error.asObservable();

  constructor() {}

  getUsers(): void {
    this.users.next(mockUsers);
  }

  addUser(name: string): void {
    const users = this.users.getValue();
    if (users.some((user) => user.name === name)) {
      this.error.next('El usuario ya existe');
    } else {
      const user: User = { id: generateRandomHash(), name };
      this.users.next([...users, user]);
      this.error.next('');
    }
  }
}
