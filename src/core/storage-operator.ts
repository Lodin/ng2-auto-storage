import {NgStorage} from './ng-storage';
import {Serializer} from './serializer';
import {SerializationRule} from './serialization-rule';

export class StorageOperator implements NgStorage, Serializer {
  public get keys(): string[] {
    return [''];
  }

  public get(key: string): any {
    return null;
  }

  public has(key: string): boolean {
    return false;
  }

  public remove(key: string): void {
    return;
  }

  public set(key: string, value: any): void {
    return;
  }

  public useSerializationRule(rule: SerializationRule) {
    return;
  }
}
