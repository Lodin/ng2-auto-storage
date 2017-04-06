import {GlobalSettings} from '../core';
import {KeyOperator} from './key-operator';
import CommonKeyOperator from './common-key-operator';

export class AdaptedKeyOperator implements KeyOperator {
  constructor(private _prefix: string) {
  }

  public belongs(key: string): boolean {
    const parts = key.split(GlobalSettings.delimiter);

    return (GlobalSettings.isPrefixSet && parts.length === 3 && parts[1] === this._prefix)
      || (!GlobalSettings.isPrefixSet && parts.length === 2 && parts[0] === this._prefix);
  }

  public build(key: string): string {
    const d = GlobalSettings.delimiter;
    return GlobalSettings.isPrefixSet
      ? `${GlobalSettings.prefix}${d}${this._prefix}${d}${key}`
      : `${this._prefix}${d}${key}`;
  }

  public strip(key: string): string {
    return CommonKeyOperator.strip(key);
  }
}
