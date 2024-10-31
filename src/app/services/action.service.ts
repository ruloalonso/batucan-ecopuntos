import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Action } from '../models/action.model';
import { ActionType } from '../models/action.model';
import { mockActions } from './actions.mock';
import { generateRandomHash } from './core.utils';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  actions = new BehaviorSubject<Action[]>([]);
  actions$ = this.actions.asObservable();

  constructor(private httpClient: HttpClient) {}

  getActions(): void {
    this.httpClient
      .get<Action[]>('https://batucan-ecopuntos-api.vercel.app/actions')
      .subscribe((actions) => {
        this.actions.next(actions);
      });
  }

  createAction(user: User, date: Date, type: ActionType): void {
    const newAction = {
      userId: user._id,
      date,
      actionTypeId: type._id,
    };
    this.httpClient
      .post<Action>('https://batucan-ecopuntos-api.vercel.app/actions', newAction)
      .subscribe((action) => {
        const actions = this.actions.getValue();
        this.actions.next([...actions, action]);
      });
  }

  getPointsByUserId(userId: string): number {
    const actions = this.actions.getValue();
    const points = actions
      .filter((action) => action.user?._id === userId)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.type.points,
        0
      );
    return points;
  }
}
