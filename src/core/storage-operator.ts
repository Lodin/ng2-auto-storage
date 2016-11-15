import {KeyOperator} from '../key-operators';
import {GlobalSettings} from './global-settings';
import {NgStorage} from './ng-storage';
import {Serializer} from './serializer';
import {SerializationRule} from './serialization-rule';

export class StorageOperator implements NgStorage, Serializer {
  private _serializer: SerializationRule = GlobalSettings.serializationRule;

  constructor(private _storage: Storage,
              private _keyOperator: KeyOperator) {
  }

  public get keys(): string[] {
    const keys: string[] = [];

    for (let i = 0, len = this._storage.length; i < len; i++) {
      const key = this._storage.key(i);

      if (this._keyOperator.belongs(key)) {
        keys.push(this._keyOperator.strip(key));
      }
    }

    return keys;
  }

  public get(key: string): any {
    return this._serializer.deserialize(this._storage.getItem(this._keyOperator.build(key)));
  }

  public has(key: string): boolean {
    return !!this._storage.getItem(this._keyOperator.build(key));
  }

  public remove(key: string): void {
    this._storage.removeItem(this._keyOperator.build(key));
  }

  public set(key: string, value: any): void {
    this._storage.setItem(this._keyOperator.build(key), this._serializer.serialize(value));
  }

  public useSerializationRule(rule: SerializationRule): void {
    this._serializer = rule ? rule : this._serializer;
  }
}
