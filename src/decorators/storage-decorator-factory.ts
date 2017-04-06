import {PropertyRegistry} from '../property-operators/property-registry';
import {WebStorage} from '../core/web-storage';

export abstract class StorageDecoratorFactory {
  public static create(storage: Storage) {
    return (keyOrOptions: string | WebStorage = {}) => (target: any, property: string) => {
      const options = processOptions(keyOrOptions, property);
      const hiddenName = PropertyRegistry.createHiddenName(property, storage);

      Object.defineProperties(target, {
        [hiddenName]: {
          enumerable: false,
          configurable: true,
          writable: true,
          value: null
        },
        [property]: {
          get(): any {
            if (!PropertyRegistry.has(this, storage, property)) {
              PropertyRegistry.add(this, storage, property, options);
            }

            return this[hiddenName];
          },
          set(value: any): void {
            if (!PropertyRegistry.has(this, storage, property)) {
              PropertyRegistry.add(this, storage, property, options);
            }

            this[hiddenName] = value;
          }
        }
      });
    };
  }
}

function processOptions(keyOrOptions: string | WebStorage, property: string): WebStorage {
  const options: WebStorage = typeof keyOrOptions === 'string'
    ? {key: keyOrOptions}
    : keyOrOptions;

  if (!options.key) {
    options.key = property;
  }

  if (!options.serialize) {
    options.serialize = JSON.stringify;
  }

  if (!options.deserialize) {
    options.deserialize = JSON.parse;
  }

  return options;
}
