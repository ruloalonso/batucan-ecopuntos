import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '../models/action.model';
import { ActionType } from '../models/action-type.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  actions = new BehaviorSubject<Action[]>([]);
  actions$ = this.actions.asObservable();

  private apiUrl = 'http://localhost:3000/actions';

  constructor(private httpClient: HttpClient) {}

  getActions(): void {
    this.httpClient.get<Action[]>(this.apiUrl).subscribe((actions) => {
      this.actions.next(actions);
    });
  }

  createAction(user: User, date: Date, type: ActionType): void {
    const newAction = {
      userId: user._id,
      date,
      description: type.description,
      points: type.points,
    };
    this.httpClient.post<Action>(this.apiUrl, newAction).subscribe((action) => {
      const actions = this.actions.getValue();
      this.actions.next([...actions, action]);
    });
  }

  deleteAction(actionId: string): Observable<void> {
    const apiUrl = this.apiUrl + '/' + actionId;
    return this.httpClient.delete<void>(apiUrl).pipe(
      tap(() => {
        const actions = this.actions.getValue();
        this.actions.next(actions.filter((action) => action._id !== actionId));
      })
    );
  }
}
