import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from '../models/action.model';
import { ActionType } from '../models/action.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActionTypeService {
  actionTypes = new BehaviorSubject<ActionType[]>([]);
  actionTypes$ = this.actionTypes.asObservable();

  private apiUrl = 'http://localhost:3000/action-types';
  // apiUrl = 'https://batucan-ecopuntos-api.vercel.app/action-types';

  constructor(private httpClient: HttpClient) {}

  getActionTypes(): void {
    this.httpClient.get<ActionType[]>(this.apiUrl).subscribe((actionTypes) => {
      this.actionTypes.next(actionTypes);
    });
  }

  createActionType(name: string, points: number): void {
    const newActionType = { name, points };
    this.httpClient
      .post<ActionType>(this.apiUrl, newActionType)
      .subscribe((actionType) => {
        const actionTypes = this.actionTypes.getValue();
        this.actionTypes.next([...actionTypes, actionType]);
      });
  }
}
