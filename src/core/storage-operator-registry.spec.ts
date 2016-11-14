import {StorageOperatorRegistry} from './storage-operator-registry';

abstract class Mock {
  public static readonly target = {name: 'Target'};
  public static readonly storage = window.localStorage;
  public static readonly value = {name: 'StorageOperator'};
}

describe('Class: StorageOperatorRegistry', () => {
  let instance: StorageOperatorRegistry;

  beforeEach(() => {
    instance = new StorageOperatorRegistry();
  });

  it('should allow to set value mapped with instance and storage', () => {
    instance.set(Mock.target, Mock.storage, <any> Mock.value);
    expect((<any> instance)._data.get(Mock.storage).get(Mock.target)).toEqual(Mock.value);
  });

  it('should get value mapped with instance and storage', () => {
    instance.set(Mock.target, Mock.storage, <any> Mock.value);
    expect(instance.get(Mock.target, Mock.storage));
  });

  it('should inform of presence of value mapped with instance and storage in the registry', () => {
    expect(instance.has(Mock.target, Mock.storage)).not.toBeTruthy();
    instance.set(Mock.target, Mock.storage, <any> Mock.value);
    expect(instance.has(Mock.target, Mock.storage)).toBeTruthy();
  });
});
