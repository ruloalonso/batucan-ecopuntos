import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Action } from '../models/action.model';
import { ActionType } from '../models/action.model';
import { mockActions } from './actions.mock';
import { generateRandomHash } from './core.utils';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  actions = new BehaviorSubject<Action[]>([]);
  actions$ = this.actions.asObservable();

  constructor() {}

  loadActions(): void {
    this.actions.next(mockActions);
  }

  createAction(user: User, date: Date, type: ActionType): void {
    const actions = this.actions.getValue();
    const action: Action = {
      id: generateRandomHash(),
      user,
      date,
      type,
    };
    this.actions.next([...actions, action]);
  }

  getPointsByUserId(userId: string): number {
    const actions = this.actions.getValue();
    const points = actions
      .filter((action) => action.user.id === userId)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.type.points,
        0
      );
    return points;
  }
}
