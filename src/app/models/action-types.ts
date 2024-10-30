import { ActionType } from './action.model';

export const actionTypes: ActionType[] = [
  { id: 'bici', name: 'Ir a ensayar en bici (3 ecopuntos)', points: 3 },
  { id: 'andando', name: 'Ir a ensayar andando (3 ecopuntos)', points: 3 },
  {
    id: 'blablacar',
    name: 'Ir a ensayar en coche compartido (1 ecopunto)',
    points: 1,
  },
];
