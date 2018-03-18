import { ModelBase } from './model_base';

export class Smoke extends ModelBase {
  get properties() {
    return [
      'smokedAt',
      'uid'
    ];
  }
}