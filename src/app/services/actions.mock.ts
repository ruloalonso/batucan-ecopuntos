import { actionTypes } from '../models/action-types';
import { Action } from '../models/action.model';
import { mockUsers } from './users.mock';

const rulo = mockUsers[0];
const diana = mockUsers[1];

const bici = actionTypes[0];
const andando = actionTypes[1];
const blablatucar = actionTypes[2];

export const mockActions: Action[] = [
  { _id: '1', user: rulo, type: bici, date: new Date(2024, 9, 22) },
  { _id: '2', user: diana, type: andando, date: new Date(2024, 9, 21) },
  { _id: '3', user: diana, type: bici, date: new Date(2024, 9, 19) },
  { _id: '4', user: rulo, type: blablatucar, date: new Date(2024, 9, 19) },
];
