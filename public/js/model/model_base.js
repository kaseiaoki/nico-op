export class ModelBase {
  constructor(values = null) {
    if (values) {
      this.serialize(values);
    }
  }

  get properties() {
    return [];
  }

  serialize(values) {
    this.properties.forEach(key => {
      if (values[key] !== undefined) {
        this[key] = values[key];
      }
    });
  }

  deserialize() {
    return this.properties.reduce((res, key) => {
      res[key] = this[key];
      return res;
    }, {});
  }
}
