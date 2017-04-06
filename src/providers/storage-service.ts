import {NgZone} from '@angular/core';
import {StorageOperator} from '../core';
import {CommonKeyOperator} from '../key-operators';

export class StorageService extends StorageOperator {
  constructor(storage: Storage, zone: NgZone) {
    super(storage, CommonKeyOperator);
  }

  public adapt(instance: any, prefix?: string): StorageOperator {
    return null;
  }
}
