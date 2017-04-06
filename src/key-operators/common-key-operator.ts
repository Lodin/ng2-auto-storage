import {KeyOperator} from './key-operator';
import {GlobalSettings} from '../core';

export class CommonKeyOperator implements KeyOperator {
  public belongs(key: string): boolean {
    const parts = key.split(GlobalSettings.delimiter);

    return (GlobalSettings.isPrefixSet && parts.length === 2 && parts[0] === GlobalSettings.prefix)
      || (!GlobalSettings.isPrefixSet && parts.length === 1);
  }

  public build(key: string): string {
    return GlobalSettings.isPrefixSet
      ? `${GlobalSettings.prefix}${GlobalSettings.delimiter}${key}`
      : key;
  }

  public strip(key: string): string {
    const parts = key.split(GlobalSettings.delimiter);
    return parts[parts.length - 1];
  }
}

export default new CommonKeyOperator();
