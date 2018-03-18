import { ModelBase } from './model_base.js';

export class Smoke extends ModelBase {
  get properties() {
    return [
      'smokedAt',
      'uid'
    ];
  }
}