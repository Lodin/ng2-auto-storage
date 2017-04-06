import * as deepEqual from 'deep-equal';
import * as clone from 'clone';
import {NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/pairwise';
import {KeyOperatorRegistry} from '../key-operators';
import {ActionRegistry, WebStorage} from '../core';


export class PropertyRegistry {
  private _data = new Map<Storage, Map<any, string[]>>();
  private _initializers = new ActionRegistry();
  private _updaters = new ActionRegistry();

  constructor() {
    this._data.set(window.localStorage, new Map());
    this._data.set(window.sessionStorage, new Map());
  }

  public add(instance: any, storage: Storage, property: string, options: WebStorage): void {
    const storageData = this._data.get(storage);
    if (!storageData.has(instance)) {
      storageData.set(instance, []);
    }

    storageData.get(instance).push(property);

    const hiddenName = this.createHiddenName(property, storage);
    this._initializers.register(() => {
      const subject = new BehaviorSubject(instance[hiddenName]);
      const keyOperator = KeyOperatorRegistry.get(instance, storage);
      const builtKey = keyOperator.build(options.key);
      const restored = storage.getItem(builtKey);

      if (restored) {
        instance[hiddenName] = options.deserialize(restored);
      }

      this._updaters.register(() => subject.next(clone(instance[hiddenName])));

      subject
        .asObservable()
        .pairwise()
        .subscribe(([previous, current]: any[]) => {
          if (!deepEqual(previous, current)) {
            storage.setItem(builtKey, options.serialize(current));
          }
        });
    });
  }

  public createHiddenName(property: string, storage: Storage): string {
    return `_${property}_${storage === window.sessionStorage ? 'session' : 'local'}_mapped`;
  }

  public has(instance: any, storage: Storage, property: string): boolean {
    const storageData = this._data.get(storage);
    return storageData.has(instance) && storageData.get(instance).includes(property);
  }

  public init(zone: NgZone) {
    this._initializers.run();
    zone.onMicrotaskEmpty.subscribe(() => this._updaters.run());
  }
}

export default new PropertyRegistry();
