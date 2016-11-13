import {KeyBuilder} from './key-builder';
import {StorageOperator} from './storage-operator';

export class Registry<T> {
  private _data = new Map<Storage, Map<any, T>>();

  constructor() {
    this._data.set(window.localStorage, new Map());
    this._data.set(window.sessionStorage, new Map());
  }

  public has(instance: any, storage: Storage): boolean {
    return this._data.get(storage).has(instance);
  }

  public get(instance: any, storage: Storage): T {
    return this._data.get(storage).get(instance);
  }

  public set(instance: any, storage: Storage, value: T): void {
    this._data.get(storage).set(instance, value);
  }
}

export const KeyBuilderRegistry = new Registry<KeyBuilder>();
export const OperatorRegistry = new Registry<StorageOperator>();
export const PrefixRegistry = new Registry<string>();
