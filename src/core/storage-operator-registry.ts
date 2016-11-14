import {StorageOperator} from './storage-operator';

export class StorageOperatorRegistry {
  private _data = new Map<Storage, Map<any, StorageOperator>>();

  constructor() {
    this._data.set(window.localStorage, new Map());
    this._data.set(window.sessionStorage, new Map());
  }

  public has(instance: any, storage: Storage): boolean {
    return this._data.get(storage).has(instance);
  }

  public get(instance: any, storage: Storage): StorageOperator {
    return this._data.get(storage).get(instance);
  }

  public set(instance: any, storage: Storage, value: StorageOperator): void {
    this._data.get(storage).set(instance, value);
  }
}
