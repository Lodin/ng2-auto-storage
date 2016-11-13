import {KeyBuilder} from './key-builder';
import {StorageOperator} from './storage-operator';

export class Registry<T> {
  private _data = new Map<Storage, Map<any, T>>();

  public has(instance: any, storage: Storage): boolean {
    return false;
  }

  public get(instance: any, storage: Storage): T {
    return null;
  }

  public set(instance: any, storage: Storage, value: T): void {

  }
}

export const KeyBuilderRegistry = new Registry<KeyBuilder>();
export const OperatorRegistry = new Registry<StorageOperator>();
export const PrefixRegistry = new Registry<string>();
