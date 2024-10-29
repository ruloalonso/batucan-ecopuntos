import { User } from "./user.model";

export interface ActionType {
  id: string;
  name: string;
  points: number;
}

export interface ActionCreate {
  id: string;
  userId: string;
  actionTypeId: string;
  date: Date;
}

export interface Action {
  id: string;
  user: User;
  type: ActionType;
  date: Date;
}