import {NgStorage} from './ng-storage';
import {KeyBuilder} from './key-builder';

export class StorageOperator implements NgStorage {
  constructor(private _target: any,
              private _storage: Storage,
              private _keyBuilder: KeyBuilder) {
  }

  public get keys(): string[] {
    return [''];
  }

  public has(key: string): boolean {
    return false;
  }

  public get(key: string): any {
    return null;
  }

  public set(key: string, value: any): void {
  }

  public remove(key: string): void {
  }
}
