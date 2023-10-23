import { PropertyController } from './controller/PropertyController';

export const Routes = [
  {
    method: 'get',
    route: '/property',
    controller: PropertyController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/property',
    controller: PropertyController,
    action: 'save',
  },
];
