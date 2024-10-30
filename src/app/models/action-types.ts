import { ActionType } from './action.model';

export const actionTypes: ActionType[] = [
  { _id: 'bici', name: 'Ir a ensayar en bici (3 ecopuntos)', points: 3 },
  { _id: 'andando', name: 'Ir a ensayar andando (3 ecopuntos)', points: 3 },
  {
    _id: 'blablacar',
    name: 'Ir a ensayar en coche compartido (1 ecopunto)',
    points: 1,
  },
];
