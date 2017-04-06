import {KeyOperator} from './key-operator';

export class KeyOperatorRegistry {
  private _data = new Map<Storage, Map<any, KeyOperator>>();

  constructor() {
    this._data.set(window.localStorage, new Map());
    this._data.set(window.sessionStorage, new Map());
  }

  public has(instance: any, storage: Storage): boolean {
    return this._data.get(storage).has(instance);
  }

  public get(instance: any, storage: Storage): KeyOperator {
    return this._data.get(storage).get(instance);
  }

  public set(instance: any, storage: Storage, value: KeyOperator): void {
    this._data.get(storage).set(instance, value);
  }
}

export default new KeyOperatorRegistry();
