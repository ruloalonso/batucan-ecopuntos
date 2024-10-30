import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { generateRandomHash } from './core.utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = new BehaviorSubject<User[]>([]);
  error = new BehaviorSubject<string>('');

  users$ = this.users.asObservable();
  error$ = this.error.asObservable();

  constructor(private httpClient: HttpClient) {}

  getUsers(): void {
    this.httpClient
      .get<User[]>('http://localhost:3000/users')
      .subscribe((users) => {
        this.users.next(users);
      });
  }

  createUser(name: string): void {
    this.httpClient
      .post<User>('http://localhost:3000/users', { name })
      .subscribe((user) => {
        const users = this.users.getValue();
        this.users.next([...users, user]);
      });
  }

  addUser(name: string): void {
    const users = this.users.getValue();
    if (users.some((user) => user.name === name)) {
      this.error.next('El usuario ya existe');
    } else {
      this.httpClient
        .post<User>('http://localhost:3000/users', { name })
        .subscribe((user) => {
          const users = this.users.getValue();
          this.users.next([...users, user]);
          this.error.next('');
        });
    }
  }
}
