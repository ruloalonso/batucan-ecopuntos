import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = new BehaviorSubject<User[]>([]);
  error = new BehaviorSubject<string>('');

  users$ = this.users.asObservable();
  error$ = this.error.asObservable();

  private apiUrl = 'https://batucan-ecopuntos-api.vercel.app/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): void {
    this.httpClient.get<User[]>(this.apiUrl).subscribe((users) => {
      this.users.next(users);
    });
  }

  createUser(name: string): Observable<User> {
    const users = this.users.getValue();
    if (users.some((user) => user.name === name)) {
      this.error.next('El usuario ya existe');
      return throwError(() => new Error('El usuario ya existe.'));
    } else {
      return this.httpClient
        .post<User>(this.apiUrl, {
          name,
        })
        .pipe(
          tap((user) => {
            const users = this.users.getValue();
            this.users.next([...users, user]);
            this.error.next('');
          })
        );
    }
  }

  addPoints(selectedUser: User, points: number): void {
    const users = this.users.getValue();
    const foundUser = users.find((user) => user._id === selectedUser._id);
    if (foundUser) {
      foundUser.points += points;
    }
    this.users.next(users);
  }
}
