import {WebStorage} from '../core';
import {SerializationRule} from '../core/serialization-rule';

export class PropertyOperator {
  private _serializer: SerializationRule;

  constructor(private _instance: any,
              private _property: string,
              private _storage: Storage,
              options: WebStorage) {

  }
}
