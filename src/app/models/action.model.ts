import { User } from "./user.model";

export interface ActionType {
  _id: string;
  name: string;
  points: number;
}

export interface ActionCreate {
  userId: string;
  date: Date;
  actionType_id: string;
}

export interface Action {
  _id: string;
  user: User;
  type: ActionType;
  date: Date;
}