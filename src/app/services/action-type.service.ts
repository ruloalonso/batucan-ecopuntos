import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionType } from '../models/action-type.model';
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

  createActionType(description: string, points: number): void {
    const newActionType = { description, points };
    this.httpClient
      .post<ActionType>(this.apiUrl, newActionType)
      .subscribe((actionType) => {
        const actionTypes = this.actionTypes.getValue();
        this.actionTypes.next([...actionTypes, actionType]);
      });
  }
}
