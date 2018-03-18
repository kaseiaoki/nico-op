import { ModelBase } from './model_base.js';

export class User extends ModelBase {
  get properties() {
    return [
      'uid',
      'displayName',
      'email'
    ];
  }
}
