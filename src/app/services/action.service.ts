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

  private apiUrl = 'https://batucan-ecopuntos-api.vercel.app/actions';

  constructor(private httpClient: HttpClient) {}

  getActions(): void {
    this.httpClient.get<Action[]>(this.apiUrl).subscribe((actions) => {
      this.actions.next(actions);
    });
  }

  createAction(user: User, date: Date, type: ActionType): Observable<Action> {
    const newAction = {
      userId: user._id,
      date,
      description: type.description,
      points: type.points,
    };
    return this.httpClient.post<Action>(this.apiUrl, newAction).pipe(
      tap((action) => {
        const actions = this.actions.getValue();
        this.actions.next([...actions, action]);
      })
    );
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
