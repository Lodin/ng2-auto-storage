import {GlobalSettings} from './global-settings';
import {PrefixRegistry} from './registries';

export class KeyBuilder {
  constructor(private _storage: Storage,
              private _target?: any) {
  }

  public get isAdapted(): boolean {
    return !!this._target && PrefixRegistry.has(this._target, this._storage);
  }

  public belongs(key: string): boolean {
    if (!this.isAdapted) {
      return false;
    }

    const parts = key.split(':');

    if (parts.length < 2) {
      return false;
    }

    const prefix = PrefixRegistry.get(this._target, this._storage);

    return (parts.length === 2 && parts[0] === prefix)
      || (parts.length === 3 && parts[1] === prefix);
  }

  public build(key: string): string {
    let result = key;

    if (this.isAdapted) {
      const prefix = PrefixRegistry.get(this._target, this._storage);
      result = `${prefix}:${result}`;
    }

    if (GlobalSettings.isPrefixSet) {
      const prefix = GlobalSettings.prefix;
      result = `${prefix}:${result}`;
    }

    return result;
  }

  public strip(key: string): string {
    const parts = key.split(':');
    const isGlobalPrefixSet = GlobalSettings.isPrefixSet;

    switch (true) {
      case !isGlobalPrefixSet && !this.isAdapted: {
        if (parts.length > 1) {
          return null;
        }

        return parts[0];
      }
      case isGlobalPrefixSet && !this.isAdapted: {
        if (parts.length !== 2 || parts[0] !== GlobalSettings.prefix) {
          return null;
        }

        return parts[1];
      }
      case !isGlobalPrefixSet && this.isAdapted: {
        if (parts.length !== 2 || parts[0] !== PrefixRegistry.get(this._target, this._storage)) {
          return null;
        }

        return parts[1];
      }
      default: {
        if (parts.length !== 3 || parts[0] !== GlobalSettings.prefix
          || parts[1] !== PrefixRegistry.get(this._target, this._storage)) {
          return null;
        }

        return parts[2];
      }
    }
  }
}
