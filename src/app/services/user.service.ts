import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  // private apiUrl = 'https://batucan-ecopuntos-api.vercel.app/users';
  users = new BehaviorSubject<User[]>([]);
  error = new BehaviorSubject<string>('');

  users$ = this.users.asObservable();
  error$ = this.error.asObservable();

  constructor(private httpClient: HttpClient) {}

  getUsers(): void {
    this.httpClient.get<User[]>(this.apiUrl).subscribe((users) => {
      this.users.next(users);
    });
  }

  createUser(name: string): void {
    const users = this.users.getValue();
    if (users.some((user) => user.name === name)) {
      this.error.next('El usuario ya existe');
    } else {
      this.httpClient
        .post<User>(this.apiUrl, {
          name,
        })
        .subscribe((user) => {
          const users = this.users.getValue();
          this.users.next([...users, user]);
          this.error.next('');
        });
    }
  }
}
