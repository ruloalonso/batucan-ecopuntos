import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  getPointsByUserId(userId: string): number {
    const actions = this.actions.getValue();
    const points = actions
      .filter((action) => action.user?._id === userId)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0
      );
    return points;
  }
}
